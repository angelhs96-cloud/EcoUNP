/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentInfo, RecycledAction } from '../types';
import { Flame, Check, Zap, Camera, Sparkles, Leaf, Plus, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardScreenProps {
  student: StudentInfo;
  onAddAction: (action: Omit<RecycledAction, 'id' | 'date'>) => void;
  onUpdateDailyProgress: (percentage: number) => void;
}

export default function DashboardScreen({
  student,
  onAddAction,
  onUpdateDailyProgress,
}: DashboardScreenProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scannedPoints, setScannedPoints] = useState(0);
  const [scannedTitle, setScannedTitle] = useState('');

  // Sample quick activities to register
  const quickActions = [
    { title: "Reciclaje de botella PET", points: 15, desc: "Depositar botella plástica limpia en el tacho verde", icon: "♻️" },
    { title: "Uso de tomatodo personal", points: 5, desc: "Beber agua de recipiente ecológico propio", icon: "🥤" },
    { title: "Transporte sostenible", points: 20, desc: "Viajar a clase en bicicleta o caminata", icon: "🚲" },
    { title: "Ahorro de papel", points: 10, desc: "Uso de apuntes 100% digitales en laboratorio", icon: "💻" }
  ];

  const handleQuickAction = (action: { title: string; points: number }) => {
    setScanning(true);
    setScannedPoints(action.points);
    setScannedTitle(action.title);

    // Simulate tech scanning effect
    setTimeout(() => {
      setScanning(false);
      setScanSuccess(true);
      
      // Update parent states
      onAddAction({
        title: action.title,
        points: action.points,
        icon: action.title.includes("botella") ? "recycling" : action.title.includes("tomatodo") ? "water" : action.title.includes("sostenible") ? "bike" : "zap"
      });

      // Increase progress percentage slightly (+10% or bounds to 100)
      const currentProgress = student.dailyProgressPercentage;
      const nextProgress = Math.min(100, currentProgress + 10);
      onUpdateDailyProgress(nextProgress);

      // Reset success screen after 2.5 seconds
      setTimeout(() => {
        setScanSuccess(false);
        setShowScanner(false);
      }, 2500);
    }, 1500);
  };

  // SVG parameters for standard circle progress
  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (student.dailyProgressPercentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Greeting */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Hola, {student.name.split(' ')[0]}</h2>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></span>
          <p className="text-sm font-semibold text-[#00E676] tracking-wide">{student.levelName}</p>
        </div>
      </div>

      {/* Streak Fire Card */}
      <div className="bg-surface/90 rounded-2xl p-5 border border-line/50 relative overflow-hidden shadow-xl shadow-black/40">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00E676]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🔥</span>
            <h3 className="text-ink font-semibold text-base">{student.weeklyStreakCount} Días en Racha</h3>
          </div>
          <span className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full border border-[#00E676]/20 font-bold uppercase tracking-wider">
            Activo Hoy
          </span>
        </div>

        {/* Dynamic Streak Row */}
        <div className="flex justify-between items-center w-full px-1">
          {student.weeklyStreakDays.map((day, idx) => {
            const isChecked = day.value === 'checked';
            const isActive = day.value === 'active';
            
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <div className={`flex-1 h-[2px] ${isChecked ? 'bg-[#00E676]' : 'bg-ink/10'}`} />}
                
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isChecked 
                      ? 'bg-[#00E676] text-black shadow-[0_0_15px_rgba(0,230,118,0.4)]' 
                      : isActive
                        ? 'bg-transparent text-[#00E676] border-2 border-[#00E676] ring-4 ring-[#00E676]/25 shadow-[0_0_20px_rgba(0,230,118,0.5)] animate-pulse'
                        : 'bg-surface2 border border-ink/10 text-ink-muted/50'
                  }`}>
                    {isChecked ? (
                      <Check className="w-4 h-4 stroke-[3px]" />
                    ) : isActive ? (
                      <Zap className="w-4 h-4 fill-[#00E676] text-black stroke-[1.5px]" />
                    ) : (
                      <span className="text-xs font-bold">{day.day}</span>
                    )}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide font-bold ${isActive ? 'text-[#00E676]' : 'text-ink-muted/60'}`}>
                    {day.day}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Interactive Circular Progress Card */}
      <div className="bg-surface/90 rounded-2xl p-6 flex flex-col items-center justify-center relative border border-line/50 shadow-xl shadow-black/40 min-h-[300px]">
        <h3 className="text-xs uppercase tracking-widest text-ink-muted/60 font-bold absolute top-5 left-5">
          Progreso Diario
        </h3>
        
        {/* Help tooltip */}
        <div className="absolute top-5 right-5 text-[#00E676] bg-[#00E676]/10 px-2.5 py-1 rounded-md text-[11px] font-bold border border-[#00E676]/20">
          Objetivo: 100%
        </div>

        {/* Circular SVG Chart */}
        <div className="relative flex items-center justify-center mt-6">
          <svg className="w-52 h-52 transform -rotate-90">
            {/* Background track */}
            <circle
              className="text-ink/5"
              cx="104"
              cy="104"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            {/* Flowing progress glow */}
            <circle
              className="text-[#00E676] drop-shadow-[0_0_12px_rgba(0,230,118,0.6)] transition-all duration-1000 ease-out"
              cx="104"
              cy="104"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-ink tracking-tight">
              {student.dailyProgressPercentage}%
            </span>
            <span className="text-xs font-semibold text-ink-muted/70 mt-1 uppercase tracking-wider">
              {student.dailyProgressPercentage >= 100 ? "¡Meta Lograda! 🎉" : "Meta del Día"}
            </span>
          </div>
        </div>

        <p className="text-xs text-ink-muted/60 text-center mt-6 max-w-xs leading-relaxed">
          {student.dailyProgressPercentage >= 100 
            ? "Has logrado tu meta diaria de reducción de residuos campus central." 
            : "Completa acciones rápidas de reciclaje y transporte para alcanzar el 100% hoy."}
        </p>
      </div>

      {/* Float Camera Trigger Container */}
      <div className="flex justify-center mt-2 z-20">
        <button 
          onClick={() => setShowScanner(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#00E676] to-[#2ECC71] text-black px-6 py-4 rounded-full shadow-[0_0_25px_rgba(0,230,118,0.45)] hover:shadow-[0_0_35px_rgba(0,230,118,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold border border-ink/20 uppercase tracking-wider text-xs"
        >
          <Camera className="w-5 h-5 stroke-[2.5px]" />
          <span>Registrar Acción Rápida</span>
        </button>
      </div>

      {/* Interactive Quick Action Simulation Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end justify-center"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-surface2 border-t-2 border-[#00E676]/30 w-full max-w-md rounded-t-[32px] p-6 shadow-2xl pb-10"
            >
              {/* Card top bar handler */}
              <div className="w-12 h-1.5 bg-ink/10 rounded-full mx-auto mb-6" />

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00E676]" />
                    Escanear Logro Campus
                  </h3>
                  <p className="text-xs text-ink-muted/60">Simula la cámara integrada de tu smartphone</p>
                </div>
                <button 
                  onClick={() => setShowScanner(false)}
                  className="bg-ink/5 hover:bg-ink/10 p-2 rounded-full text-ink/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {scanSuccess ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00E676]/20 border border-[#00E676] flex items-center justify-center text-[#00E676] mb-4 shadow-[0_0_30px_rgba(0,230,118,0.3)]">
                    <Sparkles className="w-10 h-10 animate-spin" />
                  </div>
                  <h4 className="text-[#00E676] text-xl font-bold mb-1">¡Registro Exitoso!</h4>
                  <p className="text-ink font-medium text-sm mb-1">{scannedTitle}</p>
                  <p className="text-[#00E676] font-mono font-bold text-lg">+{scannedPoints} PUNTOS ECOUNP</p>
                  <span className="text-xs text-ink/50 mt-4 leading-relaxed">
                    Puntos sumados a tu billetera escolar.<br />
                    Progreso diario aumentado.
                  </span>
                </motion.div>
              ) : scanning ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative w-40 h-40 bg-surface border border-ink/10 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                    {/* Pulsing horizontal scan line */}
                    <motion.div 
                      animate={{ y: [-70, 70] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent shadow-[0_0_15px_rgba(0,230,118,0.8)]"
                    />
                    <Camera className="w-12 h-12 text-ink-muted/30" />
                  </div>
                  <p className="text-ink font-semibold text-sm animate-pulse">Analizando acción ecológica...</p>
                  <p className="text-xs text-ink-muted/50 mt-1">Conectando con Reciclador UNP</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="bg-surface p-3.5 rounded-xl text-xs text-ink-muted border border-line/50 flex gap-2.5 items-start">
                    <AlertCircle className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                    <span>Selecciona una acción ecológica real descrita en tu entorno físico de la UNP para certificarla en tu billetera.</span>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {quickActions.map((act) => (
                      <button
                        key={act.title}
                        onClick={() => handleQuickAction(act)}
                        className="bg-surface hover:bg-surface-hi border border-ink/5 hover:border-[#00E676]/35 p-3 rounded-xl flex items-center justify-between text-left transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{act.icon}</span>
                          <div>
                            <p className="text-ink text-xs font-semibold group-hover:text-[#00E676] transition-colors">{act.title}</p>
                            <p className="text-[10px] text-ink-muted/50 line-clamp-1">{act.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-1 rounded-md border border-[#00E676]/10 shrink-0">
                          +{act.points} pts
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-center text-ink/30 italic mt-2">
                    EcoUNP utiliza reconocimiento biométrico para validar acciones.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
