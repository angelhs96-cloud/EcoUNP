/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EducationalModule, QuizQuestion, StudentInfo } from '../types';
import { initialModules, circularQuiz } from '../data';
import { BookOpen, Sparkles, Check, CheckCircle2, Lock, ArrowRight, Play, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EducationScreenProps {
  modules: EducationalModule[];
  student: StudentInfo;
  onCompleteModule: (moduleId: string, pointsAwarded: number) => void;
}

export default function EducationScreen({
  modules,
  student,
  onCompleteModule,
}: EducationScreenProps) {
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Trigger quiz simulation
  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setScore(0);
    setActiveQuiz(true);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent double selecting
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === circularQuiz[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < circularQuiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      // Award points
      onCompleteModule("mod-1", 20); // Award 20 pts
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">Educación y Conciencia</h2>
        <p className="text-xs text-ink-muted/60">Aprende sobre ecología y gana incentivos reales</p>
      </div>

      {/* Hero card: Daily Goal */}
      <div className="bg-gradient-to-br from-surface to-surface2 rounded-2xl p-5 border border-line/50 relative overflow-hidden shadow-xl shadow-black/40">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#00E676]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="text-ink font-bold text-sm mb-1">Reto de Aprendizaje Diario</h3>
            <p className="text-xs text-ink-muted/60">Termina 3 lecciones ecológicas para obtener una semilla misteriosa</p>
          </div>
          <div className="bg-surface2 border border-line p-2 rounded-lg">
            <span className="text-xl">🌱</span>
          </div>
        </div>

        {/* Reto Streak Nodes */}
        <div className="flex items-center gap-3 relative z-10 w-full">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#00E676] text-black flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(0,230,118,0.4)]">
              <Check className="w-4 h-4 stroke-[3px]" />
            </div>
            <span className="text-[9px] font-bold text-[#00E676] uppercase tracking-wide">Hecho</span>
          </div>
          
          <div className="h-[2px] bg-[#00E676] flex-1" />

          {/* If mod-1 is completed in parent student actions, node 2 is DONE, otherwise check student actions */}
          {modules[0].status === 'completed' ? (
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#00E676] text-black flex items-center justify-center font-bold text-xs shadow-[0_0_12px_rgba(0,230,118,0.4)]">
                <Check className="w-4 h-4 stroke-[3px]" />
              </div>
              <span className="text-[9px] font-bold text-[#00E676] uppercase tracking-wide">Hecho</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="w-8 h-8 rounded-full bg-surface2 border-2 border-[#00E676] text-[#00E676] flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(0,230,118,0.2)]">
                2
              </div>
              <span className="text-[9px] font-bold text-[#00E676] uppercase tracking-wide">Activo</span>
            </div>
          )}

          <div className={`h-[2px] ${modules[0].status === 'completed' ? 'bg-[#00E676]' : 'bg-ink/10'} flex-1`} />

          <div className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              modules[0].status === 'completed' 
                ? 'border-2 border-[#00E676] text-[#00E676] animate-pulse' 
                : 'bg-surface2 border border-ink/10 text-ink/30'
            }`}>
              3
            </div>
            <span className="text-[9px] font-bold text-ink/40 uppercase tracking-wide">Siguiente</span>
          </div>
        </div>
      </div>

      {/* Modules Carousel */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Módulos de Tendencia</h3>
          <span className="text-[10px] font-extrabold text-[#00E676] uppercase tracking-widest bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/25">
            Filtrado UNP
          </span>
        </div>

        {/* Horizontal scroll simulating Flutter carousel block */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {modules.map((mod) => {
            const isCompleted = mod.status === 'completed';
            const isLocked = mod.status === 'locked';
            
            return (
              <div 
                key={mod.id}
                className="snap-center shrink-0 w-[290px] bg-surface rounded-2xl overflow-hidden border border-ink/5 relative flex flex-col group shadow-xl shadow-black/20"
              >
                {/* Background Image structure */}
                <div className="h-32 w-full relative overflow-hidden bg-black/60">
                  <img 
                    src={mod.image} 
                    alt={mod.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isCompleted ? 'opacity-30 grayscale-[50%]' : 'opacity-55 group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-app/80" style={{ background: 'linear-gradient(to top, #1E2521 0%, transparent 100%)' }} />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-surface2/80 backdrop-blur-md border border-ink/10 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-[#00E676]">
                    {mod.category}
                  </div>

                  {/* Top-right floating status badges */}
                  <div className="absolute top-3 right-3">
                    {isCompleted ? (
                      <span className="bg-[#00E676] text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg shadow-black/50">
                        ✓ COMPLETADO
                      </span>
                    ) : isLocked ? (
                      <span className="bg-black/80 text-ink-muted/50 border border-ink/5 text-[9px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> REQ LVL {mod.levelRequired}
                      </span>
                    ) : (
                      <span className="bg-[#00b0ff] text-ink text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-lg shadow-black/50 flex items-center gap-0.5">
                        ⚡ +{mod.pointsValue} PTS
                      </span>
                    )}
                  </div>
                </div>

                {/* Content description card */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-[10px] text-ink-muted/50 font-bold mb-1">
                    <BookOpen className="w-3" />
                    <span>{mod.readTime}</span>
                  </div>
                  
                  <h4 className={`text-sm font-bold text-ink mb-2 leading-tight ${isCompleted ? 'line-through text-ink/50' : ''}`}>
                    {mod.title}
                  </h4>
                  
                  <p className="text-[11px] text-ink-muted/65 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {mod.description}
                  </p>

                  {/* Interactive Trigger Button */}
                  {isCompleted ? (
                    <div className="bg-surface2/90 text-[#00E676] text-xs font-bold p-2.5 rounded-xl border border-[#00E676]/20 flex items-center justify-center gap-1.5 shadow-[inset_0_0_10px_rgba(0,230,118,0.05)]">
                      <CheckCircle2 className="w-4 h-4 fill-[#00E676] text-black" />
                      <span>MÓDULO DOMINADO</span>
                    </div>
                  ) : isLocked ? (
                    <button className="w-full bg-surface2/90 text-ink/30 text-xs font-bold py-2.5 rounded-xl border border-ink/5 cursor-not-allowed flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>BLOQUEADO</span>
                    </button>
                  ) : (
                    <button 
                      onClick={startQuiz}
                      className="w-full bg-[#00E676] hover:bg-[#2eec89] text-black text-xs font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 shadow-lg shadow-[#00E676]/20 group-hover:shadow-[#00E676]/35"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Comenzar Quiz de Test</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Fidelity Simulated Quiz Overlay Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface2 border border-[#00E676]/30 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setActiveQuiz(false)}
                  className="bg-ink/5 hover:bg-ink/10 p-1.5 rounded-full text-ink/50 hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!quizCompleted ? (
                <div>
                  {/* Progress indices */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/20 font-mono">
                      PREGUNTA {currentQuestionIndex + 1} DE {circularQuiz.length}
                    </span>
                    <span className="text-xs text-ink-muted/50">Correctas: {score}</span>
                  </div>

                  <h3 className="text-ink text-sm font-bold mb-4 leading-snug">
                    {circularQuiz[currentQuestionIndex].question}
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    {circularQuiz[currentQuestionIndex].options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrectAnswer = idx === circularQuiz[currentQuestionIndex].correctIndex;
                      
                      let optionBg = "bg-surface border-ink/5 hover:border-[#00E676]/30 text-ink/90";
                      if (selectedOption !== null) {
                        if (idx === circularQuiz[currentQuestionIndex].correctIndex) {
                          optionBg = "bg-[#00E676]/20 border-[#00E676] text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.1)]";
                        } else if (isSelected) {
                          optionBg = "bg-red-500/20 border-red-500 text-red-400";
                        } else {
                          optionBg = "bg-surface/40 border-ink/5 text-ink/30 grayscale";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOption !== null}
                          onClick={() => handleOptionSelect(idx)}
                          className={`p-3.5 rounded-xl border text-left text-[11px] font-medium leading-normal transition-all duration-300 flex items-center justify-between gap-2 ${optionBg}`}
                        >
                          <span>{opt}</span>
                          {selectedOption !== null && isCorrectAnswer && (
                            <Check className="w-4 h-4 text-[#00E676] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Show explanation and diagnostic context */}
                  {selectedOption !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xl bg-ink/5 border border-ink/5 text-[10px] leading-relaxed text-ink-muted font-medium"
                    >
                      💡 {circularQuiz[currentQuestionIndex].explanation}
                    </motion.div>
                  )}

                  {/* Trigger Next question */}
                  {selectedOption !== null && (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-[#00E676] text-black text-xs font-bold py-3 rounded-xl mt-5 transition-all flex items-center justify-center gap-1.5 hover:bg-[#1dec85]"
                    >
                      <span>
                        {currentQuestionIndex === circularQuiz.length - 1 ? "Completar Desafío" : "Siguiente Pregunta"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#00E676]/10 border border-[#00E676] flex items-center justify-center text-[#00E676] text-3xl mb-4 shadow-[0_0_20px_rgba(0,230,118,0.35)]">
                    🏆
                  </div>
                  
                  <h3 className="text-ink text-lg font-bold mb-1">¡Desafío Resuelto!</h3>
                  <p className="text-xs text-ink-muted/60 max-w-xs mb-4">
                    Has finalizado con éxito el módulo interactivo de <strong>Economía Circular</strong> en la UNP, obteniendo la calificación perfecta.
                  </p>

                  <div className="bg-surface border border-ink/5 rounded-2xl p-4 w-full mb-6 flex flex-col gap-1 font-mono">
                    <p className="text-ink/60 text-[10px]">Puntaje obtenido:</p>
                    <p className="text-lg font-bold text-ink">{score} / {circularQuiz.length} correctas</p>
                    <div className="h-0.5 bg-ink/10 w-full my-2" />
                    <p className="text-xs font-bold text-[#00E676]">Recompensa: +20 pts EcoUNP</p>
                  </div>

                  <button
                    onClick={() => setActiveQuiz(false)}
                    className="w-full bg-[#00E676] text-black text-xs font-bold py-3 rounded-xl transition-all hover:bg-[#1dec85] uppercase tracking-wider"
                  >
                    Regresar al Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
