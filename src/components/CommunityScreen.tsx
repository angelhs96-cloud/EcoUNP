/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VolunteerEvent, StudentInfo, RecycledAction } from '../types';
import { Calendar, Clock, Sparkles, Trophy, Users, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunityScreenProps {
  events: VolunteerEvent[];
  student: StudentInfo;
  onRegisterEvent: (eventId: string, cost: number) => void;
}

export default function CommunityScreen({
  events,
  student,
  onRegisterEvent,
}: CommunityScreenProps) {
  const [insufficientPointsError, setInsufficientPointsError] = useState<string | null>(null);

  const handleRegisterClick = (evt: VolunteerEvent) => {
    if (student.points < evt.pointsCost) {
      setInsufficientPointsError(
        `Necesitas ${evt.pointsCost} pts para inscribirte en "${evt.title}". Tu saldo actual es de ${student.points} pts.`
      );
      // Suppress alert automatically after 3 seconds
      setTimeout(() => {
        setInsufficientPointsError(null);
      }, 3500);
      return;
    }
    
    // Deduct and change state of event in the main app
    onRegisterEvent(evt.id, evt.pointsCost);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">Comunidad UNP Sostenible</h2>
        <p className="text-xs text-ink-muted/60">Tu rendimiento y voluntariados del campus</p>
      </div>

      {/* Insufficient points alert banner */}
      <AnimatePresence>
        {insufficientPointsError && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs flex gap-2 items-start shadow-lg"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Saldo Insuficiente en Billetera</p>
              <p className="mt-0.5 opacity-90">{insufficientPointsError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tu rendimiento (datos reales del usuario) */}
      <div className="bg-surface/90 rounded-2xl p-5 border border-line/50 shadow-xl shadow-black/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#00E676] shrink-0">
            <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-ink truncate">{student.name}</h3>
            <p className="text-[11px] text-[#00E676] font-semibold truncate">{student.levelName}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-[#00E676]/10 border border-[#00E676]/25 px-2.5 py-1 rounded-full shrink-0">
            <Trophy className="w-3.5 h-3.5 text-[#00E676]" />
            <span className="text-xs font-extrabold text-[#00E676]">Lvl {student.level}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-surface2/80 border border-ink/5 rounded-xl text-center">
            <p className="text-[9px] text-ink-muted/50 uppercase tracking-wider">Puntos</p>
            <p className="text-base font-extrabold text-[#00E676] font-mono">{student.points}</p>
          </div>
          <div className="p-3 bg-surface2/80 border border-ink/5 rounded-xl text-center">
            <p className="text-[9px] text-ink-muted/50 uppercase tracking-wider">Impacto</p>
            <p className="text-base font-extrabold text-ink font-mono">{student.impactScore} kg</p>
          </div>
          <div className="p-3 bg-surface2/80 border border-ink/5 rounded-xl text-center">
            <p className="text-[9px] text-ink-muted/50 uppercase tracking-wider">Racha</p>
            <p className="text-base font-extrabold text-ink font-mono">{student.weeklyStreakCount}d</p>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-ink-muted/50 text-center leading-relaxed">
          Sigue registrando acciones para subir de nivel y ganar más impacto verde.
        </p>
      </div>

      {/* Volunteer Events Module */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-ink uppercase tracking-wider">Proyectos de Voluntariado</h3>

        <div className="flex flex-col gap-4">
          {events.map((evt) => {
            const hasJoined = evt.state === 'Inscrito';
            const slotsLeft = evt.slotsMax - evt.slotsCurrent;
            const meetsLimit = slotsLeft <= 0;
            
            return (
              <div
                key={evt.id}
                className="bg-surface border border-ink/5 rounded-2xl p-5 relative overflow-hidden group shadow-xl shadow-black/20"
              >
                {/* Visual side marker card decorator */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 ${hasJoined ? 'bg-[#00E676]' : 'bg-[#00E676]/20'}`} />

                <div className="flex justify-between items-start mb-2.5 pl-1.5">
                  <div className="pr-2">
                    <h4 className="text-ink font-bold text-sm tracking-tight">{evt.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-ink-muted/50 font-bold mt-1">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00E676]" />
                        {evt.date}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00E676]" />
                        {evt.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[9px] uppercase font-bold text-ink/40 tracking-wider">Cupos</span>
                    <div className="text-xs font-mono font-bold text-ink bg-surface2 px-2 py-1 rounded border border-ink/5">
                      <span className="text-[#00E676]">{evt.slotsCurrent}</span>
                      <span className="opacity-30">/{evt.slotsMax}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-ink-muted/70 leading-relaxed mb-4 pl-1.5">
                  {evt.description}
                </p>

                {/* Confirm Enrollment button */}
                <div className="pl-1.5">
                  {hasJoined ? (
                    <div className="bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,230,118,0.06)] animate-pulse">
                      <CheckCircle className="w-4 h-4 fill-[#00E676] text-black" />
                      <span>¡ESTÁS INSCRITO EN ESTE EVENTO! 🎉</span>
                    </div>
                  ) : meetsLimit ? (
                    <button
                      disabled
                      className="w-full bg-surface2 text-ink/30 text-xs font-bold py-3 rounded-xl border border-ink/5 cursor-not-allowed text-center"
                    >
                      VACANTES AGOTADAS 🔒
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(evt)}
                      className="w-full bg-[#00E676] hover:bg-[#1dec85] text-black text-xs font-extrabold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-[#00E676]/25"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Inscribirme (Consume {evt.pointsCost} puntos)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
