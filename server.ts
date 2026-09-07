import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const isESM = typeof import.meta !== 'undefined' && !!(import.meta as any).url;
const serverFilename = isESM ? fileURLToPath((import.meta as any).url) : __filename;
const serverDirname = isESM ? path.dirname(serverFilename) : __dirname;

const app = express();
app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY is not configured in environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. API: AI Tour Guide Chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const ai = getGeminiClient();

    // Map message history to Gemini format (user/model)
    // We get last message as current prompt and convert others to history
    const geminiHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const currentPrompt = messages[messages.length - 1]?.text || 'Hello';

    const systemInstruction = `
      You are "Aki Ciletuh", an experienced, friendly local resident and tour guide for the UNESCO Global Geopark Ciletuh in Sukabumi, Indonesia.
      Provide answers in Bahasa Indonesia or English based on the user's language.
      Explain local geology, waterfalls (Curug Cimarinjung, Curug Awang), scenic peaks (Puncak Darma), beaches (Pantai Palangpang), and ancient rock graben formations like Panenjoan.
      Also explain cultural heritage like Kasepuhan Sinar Resmi and local foods like Hanjeli grain.
      Be warm, educational, concise, and helpful. Always encourage conservation and respect for local traditions.
      If the user specifies budget constraint or interests, adapt your suggestions.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction,
      },
      history: geminiHistory,
    });

    const result = await chat.sendMessage({
      message: currentPrompt,
    });

    res.json({ text: result.text });
  } catch (err: any) {
    console.error('Error in chatbot:', err);
    res.status(500).json({ error: err.message || 'Error communicating with AI Tour Guide' });
  }
});

// 2. API: AI Smart Trip Planner (Itinerary generator)
app.post('/api/planner', async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const { destinations, days, budgetLevel, participants, transportation, travelType, accommodationType } = input;

    const ai = getGeminiClient();

    const promptText = `
      Create a detailed ${days}-day smart travel itinerary for Geopark Ciletuh, Sukabumi.
      Travel Type Category: ${travelType || 'general'}
      Selected Destination Highlights: ${destinations && destinations.length ? destinations.join(', ') : 'Puncak Darma, Curug Cimarinjung, Pantai Palangpang, Panenjoan'}
      Participants: ${participants || 1} people
      Transportation vehicle chosen: ${transportation || 'car'}
      Accommodation preference style: ${accommodationType || 'homestay'}
      Budget target category: ${budgetLevel || 'moderate'} (backpacker vs moderate vs premium)

      Return a response strictly matching the schema layout containing an itinerary array of days, estimated realistic cost Breakdown in Indonesian Rupiah (IDR), and personalized AI tour advice.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
      config: {
        systemInstruction: `
          You are a professional travel coordinator for Geopark Ciletuh.
          Generate realistic travel itineraries in Geopark Ciletuh. Provide structured hourly/time-block details for each day.
          Calculate prices in IDR (Indonesian Rupiah). For example:
          - Backpacker lodging: 100,000 - 200,000 IDR / night
          - Moderate / Homestay: 250,000 - 450,000 IDR / night
          - Premium lodge / resort: 700,000 - 1,500,000 IDR / night
          Calculate local meals at 20,000 IDR (cheap) or 50,000 - 100,000 IDR (seafood/premium) per person.
          Keep transportation costs realistic (motorcycle rental is ~80,000 IDR/day, car is ~400,000 IDR/day).
          Generate recommendations for nearby culinary spots (e.g., seafood at Pantai Palangpang) and tourist attractions.
        `,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['itinerary', 'summaryCost', 'aiRecommendationText'],
          properties: {
            itinerary: {
              type: Type.ARRAY,
              description: 'Array of itinerary items for each day',
              items: {
                type: Type.OBJECT,
                required: ['day', 'activities'],
                properties: {
                  day: { type: Type.INTEGER, description: 'Day number' },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ['time', 'title', 'description', 'cost', 'category'],
                      properties: {
                        time: { type: Type.STRING, description: 'e.g. "08:00 - 10:00"' },
                        title: { type: Type.STRING, description: 'Name of the spot or action' },
                        description: { type: Type.STRING, description: 'What to make, look at, or enjoy' },
                        cost: { type: Type.NUMBER, description: 'Estimated cost in IDR for all participants' },
                        category: { type: Type.STRING, description: 'e.g. "destination", "meal", "travel", "lodging"' }
                      }
                    }
                  }
                }
              }
            },
            summaryCost: {
              type: Type.OBJECT,
              required: ['ticketPriceTotal', 'accommodationTotal', 'consumptionTotal', 'transportationTotal', 'otherCosts', 'total', 'perPerson'],
              properties: {
                ticketPriceTotal: { type: Type.NUMBER, description: 'Total ticket cost in IDR' },
                accommodationTotal: { type: Type.NUMBER, description: 'Total lodging cost in IDR' },
                consumptionTotal: { type: Type.NUMBER, description: 'Total meals cost in IDR' },
                transportationTotal: { type: Type.NUMBER, description: 'Total fuel, rental, parking in IDR' },
                otherCosts: { type: Type.NUMBER, description: 'Other reserves/unplanned cost in IDR' },
                total: { type: Type.NUMBER, description: 'Total absolute sum in IDR' },
                perPerson: { type: Type.NUMBER, description: 'Total cost divided by participant count' }
              }
            },
            aiRecommendationText: {
              type: Type.STRING,
              description: 'A warm personalized 3-sentence guide / tip regarding weather geoconservation & packing.'
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json(parsedData);
  } catch (err: any) {
    console.error('Error in travel planner:', err);
    res.status(500).json({ error: err.message || 'Error generating trip plan' });
  }
});

// Port configuration
const PORT = 3000;

async function startServer() {
  // Integration of Vite middleware in Development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Starting in development mode with Vite middleware...');
    const vite = await import('vite');
    const viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'spa', // Let Vite handle SPA fallback for index.html
    });
    app.use(viteServer.middlewares);
  } else {
    console.log('Starting in production mode serving built files...');
    // Serve static files from built dist output
    const distPath = path.join(serverDirname, 'dist');
    app.use(express.static(distPath));
    
    // Fallback for client SPA routes
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Tourism Geopark Ciletuh Server is listening exclusively on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
