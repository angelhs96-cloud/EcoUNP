/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentInfo, RewardItem } from '../types';
import { initialRewards } from '../data';
import { ScanQrCode, Award, Coins, ChevronRight, Gift, QrCode, Check, RefreshCw, X, HelpCircle, ArrowUpRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileScreenProps {
  student: StudentInfo;
  rewards: RewardItem[];
  onRedeemReward: (rewardId: string, pointsCost: number, generatedCode: string) => void;
  onLogout: () => void;
}

export default function ProfileScreen({
  student,
  rewards,
  onRedeemReward,
  onLogout,
}: ProfileScreenProps) {
  const [showIdPass, setShowIdPass] = useState(false);
  const [claimSuccessReward, setClaimSuccessReward] = useState<RewardItem | null>(null);
  const [insufficientMsg, setInsufficientMsg] = useState<string | null>(null);

  const handleRedeem = (rew: RewardItem) => {
    if (student.points < rew.points) {
      setInsufficientMsg(`Te faltan ${rew.points - student.points} pts para canjear "${rew.title}".`);
      setTimeout(() => setInsufficientMsg(null), 3000);
      return;
    }

    // Generate random mock voucher code
    const uniqueHash = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `${rew.title.split(' ')[0].toUpperCase()}-UNP-${uniqueHash}`;
    
    // Call parent hooks
    onRedeemReward(rew.id, rew.points, voucherCode);

    const updated = { ...rew, claimCode: voucherCode };
    setClaimSuccessReward(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink font-sans">Perfil del Estudiante</h2>
        <p className="text-xs text-ink-muted/60">Administra tus credenciales universitarias y recompensas</p>
      </div>

      {/* Insufficient points bar */}
      <AnimatePresence>
        {insufficientMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3 bg-[#ff9587]/15 text-[#ff9587] border border-[#ff9587]/30 rounded-xl text-xs flex gap-2"
          >
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{insufficientMsg} ¡Sigue reciclando para acumular saldo!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Identity Card Bento Style */}
      <div className="bg-surface/90 rounded-2xl p-5 border border-line/50 relative overflow-hidden shadow-xl shadow-black/40">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col items-center text-center mt-2 z-10">
          <div className="relative w-24 h-24 shrink-0 mb-3">
            <img 
              src={student.avatarUrl} 
              alt={student.name}
              className="w-24 h-24 rounded-full border-2 border-[#00E676]/30 object-cover z-10 relative p-1 bg-surface2"
            />
            {/* Embedded Level Tag */}
            <div className="absolute bottom-[-6px] right-1/2 translate-x-1/2 bg-surface2 border border-[#00E676]/70 text-[#00E676] font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg z-20">
              Lvl {student.level}
            </div>
          </div>

          <h3 className="text-ink text-base font-bold tracking-tight">{student.name}</h3>
          <p className="text-[11px] text-ink-muted/50 font-bold uppercase tracking-wider">{student.career}</p>
          <p className="text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full mt-2 font-bold uppercase tracking-wide border border-[#00E676]/10">
            {student.levelName}
          </p>

          <div className="flex gap-3 w-full mt-5">
            <div className="bg-surface2/80 border border-ink/5 rounded-xl p-3 flex-1">
              <p className="text-[9px] uppercase font-bold text-ink-muted/60 mb-0.5 tracking-wider">Impacto Total</p>
              <p className="text-sm font-extrabold text-[#00E676] font-mono">{student.impactScore.toLocaleString()} Kg</p>
            </div>
            <div className="bg-surface2/80 border border-ink/5 rounded-xl p-3 flex-1">
              <p className="text-[9px] uppercase font-bold text-ink-muted/60 mb-0.5 tracking-wider font-sans">Rango Global</p>
              <p className="text-sm font-extrabold text-ink font-mono">#{student.globalRank}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Pass module */}
      <div 
        onClick={() => setShowIdPass(true)}
        className="bg-surface border border-ink/5 rounded-2xl p-5 flex flex-col items-center justify-center relative cursor-pointer group hover:border-[#00E676]/35 transition-all duration-300"
      >
        <span className="text-[9px] uppercase font-bold text-ink-muted/60 absolute top-4 left-4 tracking-wider">ID Estudiante</span>
        <ScanQrCode className="w-4 h-4 text-[#00E676] absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity" />

        <div className="mt-5 bg-white p-2.5 rounded-xl shadow-lg shadow-black/50 group-hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 bg-black flex items-center justify-center relative overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBKspu3OqOHfA0rmRwz6Q1Zg0yIyTtGzubMd3ETAFMXsjBKgP4spXt3AEjU5lLNQixrF2UIBWVrHt9PxQFSnAvZLqNnlP1H_KqHVrCKqnnQQcWf-1COfmISoINUnmOjiH9e-79RLswlkPrIogTpzaEjDnbngQiMuYzdNmK66Vf2u6vEqkPMlQ57jx2Uo7QxsFDdrMp5d_w-vGOfgU4zrOWQMdPxnwmNntJJ_Z-AIsDKJNeYP3Gy4MLT_mMWJoRyHM3lf1yfOKMA" 
              alt="QR Code" 
              className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
            />
          </div>
        </div>
        <p className="text-[10px] text-ink-muted/50 font-bold uppercase tracking-wider mt-4">
          Toca para expandir credencial EcoUNP
        </p>
      </div>

      {/* Reward Store Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end mb-1">
          <div>
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Tienda de Canjes</h3>
            <p className="text-[11px] text-ink-muted/50">Cambia puntos por beneficios reales en el campus</p>
          </div>
          <p className="text-xs font-mono font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-1 rounded border border-[#00E676]/20 shrink-0">
            {student.points} pts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {rewards.map((rew) => {
            const progress = rew.progressPercentage || (student.points / rew.points) * 100;
            const progressClamped = Math.min(100, Math.floor(progress));
            const pointsNeeded = rew.points - student.points;
            const canAfford = student.points >= rew.points;
            
            return (
              <div 
                key={rew.id}
                className={`bg-surface border border-ink/5 rounded-2xl overflow-hidden flex flex-col relative group transition-all duration-300 ${
                  canAfford ? 'border-[#00E676]/20 hover:border-[#00E676]/45' : 'opacity-70'
                }`}
              >
                {/* Background image bar */}
                <div className="h-28 relative w-full overflow-hidden bg-black/60">
                  <img 
                    src={rew.image} 
                    alt={rew.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-app" style={{ background: 'linear-gradient(to top, #1E2521 0%, transparent 100%)' }} />
                  
                  {/* Category identifier */}
                  <span className="absolute top-3 left-3 bg-surface2/80 border border-ink/10 px-2 py-0.5 rounded text-[9px] font-bold text-ink-muted uppercase tracking-widest">
                    {rew.category}
                  </span>

                  {/* Claims visual check */}
                  {rew.userClaimed && (
                    <span className="absolute top-3 right-3 bg-[#00E676] text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-black/60 animate-pulse">
                      ✓ EN CANJE
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-ink text-sm font-bold tracking-tight mb-1">{rew.title}</h4>
                  <p className="text-[11px] text-ink-muted/60 leading-relaxed line-clamp-2 pr-2 mb-4">{rew.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className={`text-sm font-extrabold font-mono ${canAfford ? 'text-[#00E676]' : 'text-ink-muted/55'}`}>
                      {rew.points} pts
                    </span>

                    {/* Claims buttons updates */}
                    {rew.userClaimed ? (
                      <button 
                        onClick={() => {
                          const updatedCode = rew.claimCode || "VOUCHER-UNP";
                          setClaimSuccessReward({...rew, claimCode: updatedCode});
                        }}
                        className="bg-[#00E676]/20 hover:bg-[#00E676]/35 text-[#00E676] border border-[#00E676]/40 font-bold text-[10px] px-3.5 py-2 rounded-xl transition-all uppercase tracking-wider"
                      >
                        Ver Cupón 🎫
                      </button>
                    ) : canAfford ? (
                      <button
                        onClick={() => handleRedeem(rew)}
                        className="bg-[#00E676] hover:bg-[#1fec86] text-black font-extrabold text-[10px] px-4 py-2 rounded-xl transition-all shadow-md shadow-[#00E676]/20 uppercase tracking-widest"
                      >
                        REDEEM
                      </button>
                    ) : (
                      <span className="text-[9px] bg-surface2 border border-ink/5 font-extrabold px-3 py-1.5 rounded-xl text-ink/30 tracking-tight">
                        {pointsNeeded} PTS MÁS
                      </span>
                    )}
                  </div>

                  {/* Draw progress bar if locked */}
                  {!rew.userClaimed && !canAfford && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center text-[9px] font-bold text-ink-muted/40 mb-1 font-mono uppercase">
                        <span>Fondo Acumulado</span>
                        <span>{progressClamped}%</span>
                      </div>
                      <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${progressClamped}%` }}
                          className="h-full bg-ink/30 rounded-full" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={onLogout}
        className="w-full bg-surface hover:bg-surface-hi border border-line hover:border-[#ff9587]/40 text-ink-muted hover:text-[#ff9587] text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Cerrar sesión
      </button>

      {/* Expanded Student ID Card Pass Drawer */}
      <AnimatePresence>
        {showIdPass && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-gradient-to-br from-surface to-surface2 border-2 border-[#00E676] rounded-[28px] p-6 w-full max-w-sm shadow-2xl relative"
            >
              {/* Abs close button */}
              <button 
                onClick={() => setShowIdPass(false)}
                className="absolute top-4 right-4 bg-ink/5 hover:bg-ink/10 p-1.5 rounded-full text-ink/55"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-2">
                <span className="text-[#00E676] text-xs font-black uppercase tracking-widest font-sans">
                  CREDENCIAL BIOMÉTRICA
                </span>
                <p className="text-[10px] text-ink-muted/50 font-mono tracking-wide">ECOUNP VALIDACIÓN MOVIL</p>
                
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mt-4 mb-3 border-2 border-[#00E676] shadow-lg shadow-[#00E676]/10">
                  <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                </div>

                <h3 className="text-ink text-base font-extrabold tracking-tight">{student.name}</h3>
                <p className="text-[10px] text-ink-muted/60 font-semibold uppercase">{student.career}</p>
                <p className="text-xs text-[#00E676] font-mono font-bold mt-1 tracking-wider">{student.studentId}</p>

                <div className="my-5 bg-white p-3 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center border-4 border-[#00E676]/30 shadow-2xl shadow-black/50">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBKspu3OqOHfA0rmRwz6Q1Zg0yIyTtGzubMd3ETAFMXsjBKgP4spXt3AEjU5lLNQixrF2UIBWVrHt9PxQFSnAvZLqNnlP1H_KqHVrCKqnnQQcWf-1COfmISoINUnmOjiH9e-79RLswlkPrIogTpzaEjDnbngQiMuYzdNmK66Vf2u6vEqkPMlQ57jx2Uo7QxsFDdrMp5d_w-vGOfgU4zrOWQMdPxnwmNntJJ_Z-AIsDKJNeYP3Gy4MLT_mMWJoRyHM3lf1yfOKMA" 
                    alt="Extended QR" 
                    className="w-full h-full object-cover grayscale mix-blend-multiply" 
                  />
                </div>

                <p className="text-[10px] text-ink-muted/65 max-w-xs mx-auto leading-relaxed">
                  Presenta esta credencial en los <strong>Ciclos-Tachos</strong> o centros de reciclaje autorizados UNP para sumar puntos automáticamente.
                </p>

                <div className="h-px bg-ink/10 w-full my-4" />

                <div className="flex justify-around items-center text-xs">
                  <div>
                    <p className="text-ink font-mono font-extrabold text-[#00E676]">{student.impactScore} kg</p>
                    <p className="text-[9px] text-ink-muted/50 uppercase tracking-wider font-sans mt-0.5">Impacto</p>
                  </div>
                  <div className="w-px h-8 bg-ink/10" />
                  <div>
                    <p className="text-ink font-mono font-extrabold text-[#00E676]">LVL {student.level}</p>
                    <p className="text-[9px] text-ink-muted/50 uppercase tracking-wider font-sans mt-0.5">Nivel Estudiante</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Claims Successful Pop-up Modal */}
      <AnimatePresence>
        {claimSuccessReward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-surface2 border border-[#00E676] rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl relative"
            >
              <button 
                onClick={() => setClaimSuccessReward(null)}
                className="absolute top-4 right-4 bg-ink/5 hover:bg-ink/10 p-1 rounded-full text-ink/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-[#00E676]/10 border border-[#00E676] flex items-center justify-center text-[#00E676] text-3xl mx-auto mt-2 mb-4 shadow-[0_0_20px_rgba(0,230,118,0.3)] animate-pulse">
                🎫
              </div>

              <h3 className="text-ink text-lg font-bold mb-1">¡Cupón Canjeado!</h3>
              <p className="text-xs text-ink-muted/60 max-w-xs mx-auto mb-5 leading-normal">
                Usa este código en los puntos autorizados del campus para activar tu beneficio sostenible de inmediato.
              </p>

              <div className="bg-surface border border-ink/5 rounded-2xl p-4 flex flex-col items-center gap-1.5 mb-5 font-mono">
                <p className="text-[10px] text-ink/50 uppercase tracking-widest leading-none">CÓDIGO DE VALIDACIÓN UNP</p>
                <p className="text-base font-black text-[#00E676] select-all tracking-widest">{claimSuccessReward.claimCode}</p>
                <div className="h-[2px] bg-ink/10 w-full my-1.5" />
                <p className="text-ink font-bold text-xs">{claimSuccessReward.title}</p>
                <p className="text-[9px] text-ink/40">{claimSuccessReward.category}</p>
              </div>

              <button 
                onClick={() => setClaimSuccessReward(null)}
                className="w-full bg-[#00E676] text-black text-xs font-extrabold py-3 rounded-xl transition-all hover:bg-[#1fbc86] uppercase tracking-wider"
              >
                Cerrar y Volver
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
