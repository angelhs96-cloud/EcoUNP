/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RecycledAction, StudentInfo } from '../types';
import { Award, Lock, Calendar, ClipboardList, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryScreenProps {
  actions: RecycledAction[];
  student: StudentInfo;
}

// Categorías de acción que genera la app (deben coincidir con los iconos de las acciones)
const CATEGORIES = [
  { key: 'recycling', label: 'Reciclaje', icon: '♻️' },
  { key: 'water', label: 'Tomatodo', icon: '🥤' },
  { key: 'bike', label: 'Transporte', icon: '🚲' },
  { key: 'zap', label: 'Ahorro', icon: '💻' },
];

export default function HistoryScreen({ actions, student }: HistoryScreenProps) {
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  // --- Estadísticas REALES derivadas de las acciones del usuario ---
  const points: Record<string, number> = { recycling: 0, water: 0, bike: 0, zap: 0 };
  const counts: Record<string, number> = { recycling: 0, water: 0, bike: 0, zap: 0 };
  let totalEarned = 0;
  let totalActions = 0;

  for (const a of actions) {
    if (a.points > 0 && points[a.icon] !== undefined) {
      points[a.icon] += a.points;
      counts[a.icon] += 1;
      totalEarned += a.points;
      totalActions += 1;
    }
  }

  const maxCatPoints = Math.max(1, ...CATEGORIES.map(c => points[c.key]));
  const hasData = totalActions > 0;

  // --- Insignias basadas en hitos REALES ---
  const badgesList = [
    { id: '1', name: 'Pionero Verde', icon: '🌱', unlocked: actions.length >= 1,
      target: 1, current: Math.min(actions.length, 1),
      desc: 'Registra tu primera acción ecológica.' },
    { id: '2', name: 'Reciclador Activo', icon: '♻️', unlocked: counts.recycling >= 5,
      target: 5, current: counts.recycling,
      desc: 'Registra 5 acciones de reciclaje de botellas PET.' },
    { id: '3', name: 'Cero Plástico', icon: '🥤', unlocked: counts.water >= 3,
      target: 3, current: counts.water,
      desc: 'Usa tu tomatodo personal en 3 ocasiones.' },
    { id: '4', name: 'Ciclista Urbano', icon: '🚲', unlocked: counts.bike >= 3,
      target: 3, current: counts.bike,
      desc: 'Llega en transporte sostenible 3 veces.' },
    { id: '5', name: 'Ahorro Digital', icon: '💻', unlocked: counts.zap >= 5,
      target: 5, current: counts.zap,
      desc: 'Suma 5 acciones de ahorro de papel o energía.' },
    { id: '6', name: 'Centurión Verde', icon: '🏆', unlocked: student.points >= 100,
      target: 100, current: student.points,
      desc: 'Acumula 100 puntos en tu billetera ecológica.' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">Historial de Sostenibilidad</h2>
        <p className="text-xs text-ink-muted/60">Tus estadísticas y logros reales, en tiempo real</p>
      </div>

      {/* Impacto real */}
      <div className="bg-surface/90 rounded-2xl p-5 border border-line/50 shadow-xl shadow-black/40">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs uppercase tracking-widest text-ink-muted/60 font-bold">
            Impacto Ambiental
          </h3>
          <span className="text-lg font-extrabold text-[#00E676] font-mono tracking-tight drop-shadow-[0_0_8px_rgba(0,230,118,0.3)]">
            {student.impactScore} Kg
          </span>
        </div>
        <p className="text-xs text-ink-muted/50 mb-4">Estimado según tus acciones registradas</p>

        {hasData ? (
          <>
            {/* Barras por categoría (reales) */}
            <div className="h-40 relative flex items-end justify-between border-b border-ink/10 pb-1 pt-2">
              <div className="w-full flex justify-between items-end h-full px-2 z-10">
                {CATEGORIES.map((c) => {
                  const heightPercent = `${Math.max(4, (points[c.key] / maxCatPoints) * 100)}%`;
                  const active = points[c.key] > 0;
                  return (
                    <div key={c.key} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="w-full max-w-[48px] h-32 flex items-end relative">
                        <div
                          style={{ height: heightPercent }}
                          className={`w-full rounded-t-lg transition-all duration-500 ease-out relative ${
                            active
                              ? 'bg-[#00E676] shadow-[0_0_20px_rgba(0,230,118,0.4)]'
                              : 'bg-surface2 border-t border-ink/5'
                          }`}
                        >
                          {active && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded-md border border-[#00E676]/30 bg-surface2 text-[#00E676] font-bold">
                              {points[c.key]}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-base leading-none">{c.icon}</span>
                      <span className="text-[9px] font-bold uppercase tracking-tighter text-ink-muted/50">
                        {c.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumen */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-surface2/80 border border-ink/5 rounded-xl">
                <p className="text-[10px] text-ink-muted/50 uppercase tracking-wider">Acciones</p>
                <p className="text-lg font-extrabold text-ink font-mono">{totalActions}</p>
              </div>
              <div className="p-3 bg-surface2/80 border border-ink/5 rounded-xl">
                <p className="text-[10px] text-ink-muted/50 uppercase tracking-wider">Puntos ganados</p>
                <p className="text-lg font-extrabold text-[#00E676] font-mono">{totalEarned}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="py-10 flex flex-col items-center gap-2 text-center">
            <Leaf className="w-8 h-8 text-[#00E676]/40" />
            <p className="text-xs text-ink-muted/60 max-w-[220px]">
              Aún no registras acciones. Ve a <span className="text-[#00E676] font-bold">Inicio</span> y registra tu primera acción ecológica para empezar a sumar impacto.
            </p>
          </div>
        )}
      </div>

      {/* Actividad Reciente */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#00E676]" />
          Actividad Reciente
        </h3>

        <div className="bg-surface/90 rounded-2xl p-5 border border-line/50 max-h-[290px] overflow-y-auto shadow-xl shadow-black/40 pr-3">
          {actions.length === 0 ? (
            <p className="text-xs text-ink-muted/50 text-center py-4">
              Tu actividad aparecerá aquí conforme registres acciones.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {actions.map((act, idx) => (
                <div key={act.id} className="flex gap-3 relative group">
                  {idx < actions.length - 1 && (
                    <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-ink/10 group-hover:bg-[#00E676]/30 transition-colors" />
                  )}

                  <div className="w-7 h-7 rounded-full bg-surface2 border border-ink/10 flex items-center justify-center shrink-0 z-10 mt-0.5 text-xs">
                    {act.icon === "recycling" ? "♻️" : act.icon === "water" ? "🥤" : act.icon === "bike" ? "🚲" : "⚡"}
                  </div>

                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <h4 className="text-ink text-xs font-semibold">{act.title}</h4>
                      <p className="text-[10px] text-ink-muted/50 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#00E676]" />
                        {act.date}
                      </p>
                    </div>
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded border font-mono shrink-0 ${
                      act.points >= 0
                        ? 'text-[#00E676] bg-[#00E676]/10 border-[#00E676]/10'
                        : 'text-[#ff9587] bg-[#ff9587]/10 border-[#ff9587]/10'
                    }`}>
                      {act.points >= 0 ? `+${act.points}` : act.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Insignias (reales) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <Award className="w-4 h-4 text-[#00E676]" />
          Insignias y Logros
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {badgesList.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setActiveBadge(activeBadge === badge.id ? null : badge.id)}
              className={`p-4 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 border cursor-pointer select-none ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-surface to-surface2 border-[#00E676]/30 shadow-[0_0_15px_rgba(0,230,118,0.06)]'
                  : 'bg-surface2/80 opacity-70 border-ink/5'
              }`}
            >
              {badge.unlocked ? (
                <div className="absolute top-2 right-2 flex items-center justify-center text-[10px] text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-1 rounded font-bold">
                  OK
                </div>
              ) : (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center">
                  <Lock className="w-2.5 h-2.5 text-ink-muted/40" />
                </div>
              )}

              <span className={`text-3xl mb-2 ${badge.unlocked ? 'animate-bounce-slow' : 'grayscale opacity-70'}`}>
                {badge.icon}
              </span>

              <h4 className={`text-xs font-bold leading-tight ${badge.unlocked ? 'text-[#00E676]' : 'text-ink/60'}`}>
                {badge.name}
              </h4>

              {/* Barra de progreso hacia el hito */}
              {!badge.unlocked && (
                <div className="w-full mt-2">
                  <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00E676]/70 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (badge.current / badge.target) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-ink-muted/50 mt-1 font-mono">{badge.current}/{badge.target}</p>
                </div>
              )}

              <AnimatePresence>
                {activeBadge === badge.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2 pt-2 border-t border-ink/5 w-full text-[10px] text-ink-muted text-left leading-relaxed font-medium"
                  >
                    {badge.desc}
                    <div className="mt-1 font-bold italic text-[#00E676]">
                      {badge.unlocked ? "¡Insignia obtenida!" : "🔒 En progreso"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
