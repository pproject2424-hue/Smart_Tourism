import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle, Award, Sparkles, RefreshCw, Star, Download, Flame } from 'lucide-react';
import { EducationMaterial } from '../types';
import { initialEducationMaterials } from '../data';

export default function EdukasiQuiz() {
  const [materials] = useState<EducationMaterial[]>(initialEducationMaterials);
  const [selectedMat, setSelectedMat] = useState<EducationMaterial>(initialEducationMaterials[0]);

  // Quiz running states
  const [userAnswers, setUserAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [userNameForCertificate, setUserNameForCertificate] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers({ ...userAnswers, [qIdx]: optIdx });
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizSubmitted) return;

    let score = 0;
    selectedMat.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIndex) {
        score += 1;
      }
    });

    const percent = Math.round((score / selectedMat.quiz.length) * 100);
    setQuizScore(percent);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setShowCertificate(false);
  };

  const handleClaimCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userNameForCertificate.trim()) {
      setShowCertificate(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in font-sans" id="education-quiz-root">
      
      {/* List of articles left column (5 columns) */}
      <div className="lg:col-span-5 space-y-4">
        <div>
          <h2 className="text-sm font-heading font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
            <BookOpen className="w-5 h-5 text-sky-50s text-sky-500" />
            Edukasi Pusaka Geologi & Budaya
          </h2>
          <span className="text-[10px] text-slate-400 block mt-1">Belajar Warisan UNESCO Global Geopark Ciletuh</span>
        </div>

        {/* Materials List buttons */}
        <div className="space-y-3 font-sans">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => {
                setSelectedMat(mat);
                handleResetQuiz();
              }}
              className={`p-4 rounded-2xl border text-left block w-full transition-all ${
                selectedMat.id === mat.id
                  ? 'bg-sky-50 border-sky-400 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-100'
              }`}
              id={`edu_material_btn_${mat.id}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] bg-slate-105 text-slate-650 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                  {mat.category}
                </span>
                <span className="text-[9px] text-sky-550 flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" /> Certified Topic
                </span>
              </div>
              <h4 className="font-heading font-extrabold text-xs text-slate-800 mb-1">{mat.title}</h4>
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{mat.shortDesc}</p>
            </button>
          ))}
        </div>

        {/* Article Details full viewer */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs text-slate-700 leading-relaxed space-y-2">
          <strong className="block font-heading text-slate-800">Ringkasan Sains Adat</strong>
          <p className="font-sans text-[11px]">{selectedMat.content}</p>
        </div>
      </div>

      {/* Interactive Quiz & printable digital certification (7 columns) */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5">
        
        {/* Certificate Section Display if passed */}
        {showCertificate ? (
          <div className="border-4 border-double border-yellow-500/60 bg-amber-50/20 p-6 rounded-3xl space-y-5 select-none relative overflow-hidden animate-zoom-in font-serif text-center">
            
            {/* Corner traditional curves overlay */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-yellow-500 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-yellow-500 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-yellow-500 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-yellow-500 rounded-br-lg"></div>

            <div className="space-y-2">
              <Award className="w-14 h-14 text-yellow-505 mx-auto animate-bounce text-yellow-500" />
              <h3 className="font-heading font-black text-slate-800 text-lg uppercase tracking-wider">SERtIFIKAT KELULUSAN</h3>
              <span className="text-[10px] font-sans text-slate-450 block uppercase tracking-widest font-bold">Smart Tourism Geopark Ciletuh</span>
            </div>

            <p className="font-serif text-slate-650 text-xs italic max-w-md mx-auto pt-2 leading-loose">
              Dengan bangga menganugerahkan gelar kehormatan akademis kepada
              wisatawan cerdas berwawasan lingkungan Geologis:
            </p>

            <div className="border-b-2 border-slate-300 py-2 max-w-sm mx-auto">
              <span className="text-xl font-heading font-extrabold text-slate-805 tracking-wide block uppercase font-mono">{userNameForCertificate}</span>
            </div>

            <p className="text-[10px] font-sans text-slate-500 leading-relaxed max-w-xs mx-auto py-2">
              sebagai **Penjaga & Sahabat Geopark Ciletuh (UNESCO Global Geopark Guardian)** atas pemahaman mendalam tentang ekologi batuan dasar laut, pelestarian karsa purba, dan keluhuran sawah adat sereal hanjeli.
            </p>

            <div className="flex justify-between items-end text-[9px] font-sans text-slate-400 pt-4 max-w-xs mx-auto border-t border-slate-200">
              <div className="text-left font-mono">
                <span>ID: {Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="block">VERIFIED: OK</span>
              </div>
              <div className="text-right font-medium">
                <span className="block font-bold">Kasepuhan Ciletuh</span>
                <span>Majelis Konservasi Adat</span>
              </div>
            </div>

            {/* Downloader or reset */}
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={() => alert('Sertifikat Digital berhasil diunduh ke gawai Anda! (PDF Mock saved)')}
                className="bg-yellow-500 hover:bg-yellow-600 font-ui font-extrabold text-white py-1.5 px-4 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-amber-100"
              >
                <Download className="w-3.5 h-3.5" /> Unduh PDF
              </button>
              <button
                onClick={handleResetQuiz}
                className="bg-slate-100 hover:bg-slate-200 font-ui text-slate-700 py-1.5 px-4 rounded-xl text-xs"
              >
                Tutup
              </button>
            </div>

          </div>
        ) : (
          /* REGULAR QUIZ PANEL */
          <div className="space-y-4">
            <div className="border-b border-slate-50 pb-3">
              <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase flex items-center gap-1">
                <HelpCircle className="w-4.5 h-4.5 text-sky-500 animate-pulse" />
                Interaktif Kuis Kelayakan: {selectedMat.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-sans mt-0.5">Jawab seluruh pertanyaan kuis di bawah ini secara tepat dan menangkan sertifikat kelayakan certified!</p>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-5 font-sans">
              {selectedMat.quiz.map((qObj, index) => (
                <div key={index} className="space-y-2 border-b border-slate-50 pb-4">
                  <span className="text-xs font-bold text-slate-800 block">
                    {index + 1}. {qObj.question}
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {qObj.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[index] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(index, optIdx)}
                          className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                            isSelected 
                              ? 'bg-sky-50 border-sky-400 tracking-wide text-sky-700' 
                              : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                          id={`quiz_opt_${index}_${optIdx}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className={`p-2 rounded-lg text-[10px] border leading-normal mt-2 ${
                      userAnswers[index] === qObj.answerIndex 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-250/50' 
                        : 'bg-red-50 text-red-700 border-red-250/50'
                    }`}>
                      <strong>{userAnswers[index] === qObj.answerIndex ? '✓ Jawaban Anda Benar!' : '✗ Jawaban Anda Salah.'} </strong>
                      {qObj.explanation}
                    </div>
                  )}

                </div>
              ))}

              <div className="flex items-center justify-between gap-3 pt-2">
                {!quizSubmitted ? (
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-ui font-extrabold py-2.5 px-6 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                    id="submit_quiz_form_btn"
                  >
                    Kirim & Lihat Skor Kuis
                  </button>
                ) : (
                  <div className="w-full flex flex-col md:flex-row md:items-center justify-between bg-slate-50 p-4 border rounded-xl gap-3">
                    <div>
                      <span className="text-[10px] text-slate-450 block uppercase">Skor Nilai Sobat</span>
                      <span className="font-heading font-extrabold text-sm text-slate-800">{quizScore}% Kelulusan</span>
                    </div>

                    {quizScore >= 100 ? (
                      /* Pass Form to Claim Certificate */
                      <form onSubmit={handleClaimCertificate} className="flex gap-2 items-center flex-1 max-w-sm justify-end">
                        <input
                          type="text"
                          required
                          value={userNameForCertificate}
                          onChange={(e) => setUserNameForCertificate(e.target.value)}
                          placeholder="Ketik Nama Lengkap Anda..."
                          className="bg-white border p-2 rounded-xl text-xs w-full text-slate-805"
                          id="cert_name_input"
                        />
                        <button
                          type="submit"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-ui font-bold px-4 py-1.5 rounded-xl text-xs shrink-0 flex items-center gap-0.5 shadow"
                          id="claim_cert_btn"
                        >
                          <Award className="w-4 h-4 shrink-0" /> Klaim
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-red-500 block leading-tight font-medium">Batas kelulusan adalah 100% skor.</span>
                        <button
                          type="button"
                          onClick={handleResetQuiz}
                          className="text-[10px] font-bold text-sky-505 flex items-center gap-1 hover:text-sky-655"
                          id="try_again_quiz_btn"
                        >
                          <RefreshCw className="w-3.5 h-3.5 shrink-0" /> Coba Lagi
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
