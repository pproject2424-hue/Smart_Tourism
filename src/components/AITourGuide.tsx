import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, HelpCircle, X, Terminal, CheckCircle, BrainCircuit } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'model';
  text: string;
  time: string;
}

export default function AITourGuide() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'model',
      text: 'Sampurasun! Wilujeng sumping di Geopark Ciletuh. Saya Aki Ciletuh, pemandu wisata digital pribadi Anda. Ada yang bisa Aki bantu terkait sejarah tebing purba, rute, air terjun tersembunyi, kuliner hanjeli, atau homestay lokal?',
      time: '08:24',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick suggestion bubbles
  const suggestions = [
    { label: '⛰️ Sejarah Purba Ciletuh', prompt: 'Bagaimana sejarah terbentuknya bentang alam tapal kuda Amphitheatre Ciletuh purba?' },
    { label: '🌊 Air Terjun Terindah', prompt: 'Apa saja rekomendasi air terjun (curug) yang paling ikonik di Ciletuh?' },
    { label: '🏕️ Cara Hemat ke Sini', prompt: 'Berikan tips liburan hemat backpacker 2 hari di Geopark Ciletuh mulai dari penginapan dan makan.' },
    { label: '🌾 Apa itu Hanjeli?', prompt: 'Tolong jelaskan apa keistimewaan tanaman pangan lokal Hanjeli di Waluran Mandiri.' },
  ];

  // Self-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Endpoint not responding');
      }

      const resData = await response.json();
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'model',
        text: resData.text,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.warn('Chatbot endpoint fallback triggered (missing key)...', err);
      // Detailed human fallback based on keywords
      const fallbackReply = generateFallbackChatReply(textToSend);
      setMessages((prev) => [...prev, {
        id: `ai-err-${Date.now()}`,
        sender: 'model',
        text: fallbackReply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Local fallback response generator if key or endpoint is missing
  const generateFallbackChatReply = (prompt: string): string => {
    const text = prompt.toLowerCase();
    
    if (text.includes('sejarah') || text.includes('purba') || text.includes('bentang') || text.includes('amphitheatre')) {
      return `Aki jelaskan ya, Sobat. Amphitheatre atau Tapal Kuda Ciletuh itu adalah lembah raksasa berdiameter mencapai 15 km. Struktur megah ini terbentuk sekitar puluhan juta tahun silam akibat peristiwa amblasan tektonik yang dahsyat (graben). Sabuk batuannya merupakan yang tertua di Jawa Barat (berusia 60 juta tahun), terdiri atas batuan sedimen laut, kerak samudera melange, dan dinding andesit purba yang terangkat ke permukaan bumi. Luar biasa sekali kekuasaan Tuhan!`;
    }
    if (text.includes('air terjun') || text.includes('curug') || text.includes('cimarinjung') || text.includes('awang')) {
      return `Geopark Ciletuh itu surge air terjun eksotis, Sobat! Aki sarankan kunjungi 3 curug wajib ini:
1. **Curug Cimarinjung**: Tingginya 50 meter, terletak tersembunyi diantara tebing batu purba berwarna merah bata kemerahan. Ikonik sekali untuk foto!
2. **Curug Awang**: Lebarnya hampir 60 meter, dijuluki Niagara Mini Jawa Barat. Sangat megah bila dikunjungi dikala debit air melimpah.
3. **Curug Sodong & Cikanteh**: Bertingkat dua yang menyajikan keteduhan rimbun belantara hijau pegunungan.`;
    }
    if (text.includes('hemat') || text.includes('backpacker') || text.includes('budget') || text.includes('biaya')) {
      return `Nah, bagi pencinta backpacker, ikuti petunjuk hemat Aki berikut:
- **Penginapan**: Hindari resort mahal. Menginaplah di Homestay penduduk lokal disekitar Tamanjaya atau Ciwaru (tarif mulai Rp 150.000 - Rp 250.000 semalam) atau sewa tenda camping di Pantai Palangpang (Rp 50.000).
- **Transportasi**: Gunakan Motor pribadi/sewaan (Sewa motor ~Rp 80.000/hari) karena BBM sangat terjangkau dibanding rental mobil jeep.
- **Konsumsi**: Makanlah di warung nasi tradisional sunda (Nasi Timbel, Ikan asin, sambal lalap) sekali makan berkisar Rp 15.000 - Rp 20.000 per porsi.`;
    }
    if (text.includes('hanjeli') || text.includes('desa') || text.includes('waluran')) {
      return `Hanjeli (Grain Job's Tears) itu tanaman pangan purba berserat tinggi yang dikembangkan sebagai ikon ketahanan pangan Desa Waluran Mandiri Ciletuh. Biji hanjeli memiliki bentuk bulat mengkilap secara alami mirip permata hiasan. Warga lokal menyulap biji hanjeli menjadi bubur manis nan gurih (bubur hanjeli), sereal pengganti gandum, tepung cookies, rengginang gurih, bahkan dirangkai menjadi kerajinan manik-manik gelang suku adat. Menarik sekali dinikmati langsung di desanya!`;
    }
    if (text.includes('tiket') || text.includes('harga') || text.includes('bayar')) {
      return `Biaya masuk ke spot Geopark Ciletuh sangat ekonomis, Sobat. Tiket masuk rata-rata:
- Pantai Palangpang: Rp 5.000 / orang
- Puncak Darma: Rp 15.000 / orang
- Curug Cimarinjung: Rp 10.000 / orang
- Panenjoan Amphitheatre: Rp 10.000 / orang
Parkir motor berkisar Rp 3.000 - Rp 5.000 saja. Murah meriah, kan?`;
    }

    return `Pertanyaan menarik, Sobat Wisatawan! Geopark Ciletuh UNESCO Global Geopark menyembunyikan sejuta misteri batuan sedimentasi dasar samudra berumur 60 juta tahun, kearifan adat lokal sunda, dan pantai yang indah. 

(Catatan Aki: Tambahkan GEMINI_API_KEY di dashboard Secrets untuk mengaktifkan pemandu pintar AI live Aki murni membahas semua topik secara cerdas!)`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-xl p-5 flex flex-col h-[520px] justify-between font-sans relative" id="ai-chat-card">
      {/* Absolute dynamic background spark decor */}
      <div className="absolute -left-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Guide Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white text-base font-extrabold font-heading">
              AK
            </div>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-slate-800 text-sm flex items-center gap-1 leading-none">
              Aki Ciletuh AI
              <BrainCircuit className="w-3.5 h-3.5 text-sky-550 animate-pulse" />
            </h3>
            <span className="text-[10px] text-slate-450">Pemandu Adat Khas Geopark Purba</span>
          </div>
        </div>

        <div className="text-[9px] bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full font-bold font-mono">
          MODEL: {loading ? 'SEDANG MEMIKIR...' : 'ONLINE'}
        </div>
      </div>

      {/* Message list viewport container */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isModel = msg.sender === 'model';
          return (
            <div
              key={msg.id}
              className={`flex ${isModel ? 'justify-start' : 'justify-end'} animate-fade-in text-xs`}
            >
              <div className={`max-w-md rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm flex flex-col ${
                isModel 
                  ? 'bg-slate-50 text-slate-800 rounded-tl-none font-sans' 
                  : 'bg-sky-500 text-white rounded-tr-none font-sans'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[8px] mt-1 text-right select-none ${isModel ? 'text-slate-405' : 'text-sky-100'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-50 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-200"></span>
              <span className="text-[10px] font-mono text-slate-400">Aki sedang merangkai petunjuk...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Bubbles Scroller */}
      {messages.length === 1 && !loading && (
        <div className="pb-3 border-t border-slate-50/50 pt-2 z-10">
          <span className="text-[10px] text-slate-405 uppercase font-bold block mb-1.5">Coba Klik Pertanyaan Cepat:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s.prompt)}
                className="bg-slate-50 hover:bg-sky-50 text-[10px] text-slate-700 font-medium px-3 py-1.5 rounded-xl border border-slate-100 hover:border-sky-200 hover:text-sky-600 transition-all shrink-0 font-sans"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Form Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex items-center gap-2 border-t border-slate-100 pt-3 z-10"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tanya Aki tentang silsilah geologi Ciletuh..."
          className="flex-1 bg-slate-50 p-2.5 rounded-xl text-xs border border-slate-205 outline-none focus:ring-2 focus:ring-sky-400 font-sans text-slate-850"
          id="chat_text_box_input"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="bg-sky-500 hover:bg-sky-600 text-white w-9.5 h-9.5 rounded-xl flex items-center justify-center transition-colors disabled:bg-slate-100 disabled:text-slate-300 shadow-md shadow-sky-100 shrink-0"
          id="chat_send_button"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
