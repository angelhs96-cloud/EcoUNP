/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { StudentInfo, RecycledAction, EducationalModule, VolunteerEvent, RewardItem } from '../types';
import { usePersistentState } from '../hooks/usePersistentState';
import {
  createFreshStudent,
  freshHistoryActions,
  freshModules,
  initialEvents,
  initialRewards
} from '../data';
import DashboardScreen from './DashboardScreen';
import HistoryScreen from './HistoryScreen';
import EducationScreen from './EducationScreen';
import CommunityScreen from './CommunityScreen';
import ProfileScreen from './ProfileScreen';
import {
  LayoutDashboard,
  History,
  GraduationCap,
  Users,
  User,
  Coins,
  Volume2,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeAppProps {
  username: string;
  displayName: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout: () => void;
}

export default function HomeApp({ username, displayName, theme, onToggleTheme, onLogout }: HomeAppProps) {
  // Clave de almacenamiento namespaced por usuario: cada cuenta guarda sus propios datos.
  const k = (name: string) => `ecounp.v1.u.${username}.${name}`;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [soundFeedback, setSoundFeedback] = useState<string | null>(null);

  // Estado del usuario (persistido por-usuario). Cuenta nueva => arranca en cero.
  const [student, setStudent] = usePersistentState<StudentInfo>(k('student'), () => createFreshStudent(displayName));
  const [historyActions, setHistoryActions] = usePersistentState<RecycledAction[]>(k('history'), freshHistoryActions);
  const [modules, setModules] = usePersistentState<EducationalModule[]>(k('modules'), freshModules);
  const [events, setEvents] = usePersistentState<VolunteerEvent[]>(k('events'), initialEvents);
  const [rewards, setRewards] = usePersistentState<RewardItem[]>(k('rewards'), initialRewards);

  const triggerFeedback = (message: string) => {
    setSoundFeedback(message);
    setTimeout(() => setSoundFeedback(null), 2800);
  };

  const handleAddAction = (act: Omit<RecycledAction, 'id' | 'date'>) => {
    const now = new Date();
    const formattedDate = `Hoy, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newAction: RecycledAction = {
      id: `act-${Date.now()}`,
      title: act.title,
      points: act.points,
      date: formattedDate,
      icon: act.icon,
    };

    setHistoryActions(prev => [newAction, ...prev]);

    setStudent(prev => ({
      ...prev,
      points: prev.points + act.points,
      impactScore: Math.max(0, prev.impactScore + Math.floor(act.points * 0.4)),
    }));

    triggerFeedback(`¡Acción registrada! +${act.points} pts en tu billetera.`);
  };

  const handleUpdateDailyProgress = (percentage: number) => {
    setStudent(prev => ({ ...prev, dailyProgressPercentage: percentage }));
  };

  const handleCompleteLessonModule = (moduleId: string, pointsAwarded: number) => {
    setModules(prev => prev.map(m => (m.id === moduleId ? { ...m, status: 'completed' } : m)));
    handleAddAction({
      title: "Desafío de Trivia Resuelto (Economía Circular)",
      points: pointsAwarded,
      icon: "zap"
    });
  };

  const handleRegisterVolunteerEvent = (eventId: string, cost: number) => {
    setEvents(prev => prev.map(evt =>
      evt.id === eventId ? { ...evt, slotsCurrent: evt.slotsCurrent + 1, state: 'Inscrito' } : evt
    ));

    setStudent(prev => ({ ...prev, points: Math.max(0, prev.points - cost) }));

    const registeredEventName = events.find(e => e.id === eventId)?.title || "Voluntariado";
    handleAddAction({
      title: `Inscripción Voluntariado: ${registeredEventName}`,
      points: -cost,
      icon: "recycling"
    });

    triggerFeedback(`¡Inscrito con éxito! Cupo asegurado. Se descontaron ${cost} puntos.`);
  };

  const handleRedeemRewardStore = (rewId: string, cost: number, codeCode: string) => {
    setStudent(prev => ({ ...prev, points: Math.max(0, prev.points - cost) }));

    setRewards(prev => prev.map(rew =>
      rew.id === rewId ? { ...rew, userClaimed: true, claimCode: codeCode } : rew
    ));

    const rewardName = rewards.find(r => r.id === rewId)?.title || "Premio";
    handleAddAction({
      title: `Canje Tienda: ${rewardName}`,
      points: -cost,
      icon: "zap"
    });

    triggerFeedback(`¡Canje procesado con éxito! Código generado para cafetería escolar.`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <DashboardScreen
            student={student}
            onAddAction={handleAddAction}
            onUpdateDailyProgress={handleUpdateDailyProgress}
          />
        );
      case 1:
        return <HistoryScreen actions={historyActions} student={student} />;
      case 2:
        return (
          <EducationScreen
            modules={modules}
            student={student}
            onCompleteModule={handleCompleteLessonModule}
          />
        );
      case 3:
        return (
          <CommunityScreen
            events={events}
            student={student}
            onRegisterEvent={handleRegisterVolunteerEvent}
          />
        );
      case 4:
        return (
          <ProfileScreen
            student={student}
            rewards={rewards}
            onRedeemReward={handleRedeemRewardStore}
            onLogout={onLogout}
          />
        );
      default:
        return null;
    }
  };

  const tabConfig = [
    { label: "Inicio", icon: LayoutDashboard },
    { label: "Historial", icon: History },
    { label: "Aprender", icon: GraduationCap },
    { label: "Comunidad", icon: Users },
    { label: "Perfil", icon: User },
  ];

  return (
    <div className="relative z-10 w-full max-w-[440px] bg-app flex flex-col overflow-hidden min-h-[100dvh] md:min-h-0 md:h-[880px] md:rounded-[40px] md:border md:border-line md:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">

      {/* Cabecera funcional: perfil, racha y saldo */}
      <div className="px-5 py-3 bg-elevated border-b border-ink/5 flex items-center justify-between z-20 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00E676]/35 relative shadow-inner">
            <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-sm font-black text-ink tracking-wide">EcoUNP</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-line text-ink-muted hover:text-[#00E676] hover:border-[#00E676]/35 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <span className="text-xs">🔥 {student.weeklyStreakCount}d</span>
          <div className="flex items-center gap-1.5 bg-surface border border-[#00E676]/25 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold text-ink">
            <Coins className="w-3.5 h-3.5 text-[#00E676]" />
            <span>{student.points} pts</span>
          </div>
        </div>
      </div>

      {/* Toast de feedback */}
      <AnimatePresence>
        {soundFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-16 inset-x-4 z-50 bg-gradient-to-r from-surface to-surface2 border border-[#00E676] rounded-2xl p-3.5 flex items-center gap-2.5 shadow-2xl shadow-black"
          >
            <Volume2 className="w-5 h-5 text-[#00E676] shrink-0 animate-pulse" />
            <p className="text-[10px] text-ink font-bold leading-normal">{soundFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido scrolleable con transición entre pestañas */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28 select-none relative z-10 scrollbar-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación inferior persistente */}
      <nav className="absolute bottom-0 inset-x-0 bg-elevated/90 backdrop-blur-md border-t border-ink/10 flex justify-around items-center pt-2.5 pb-6 px-2 z-30 select-none">
        {tabConfig.map((tab, idx) => {
          const isActive = activeTab === idx;
          const TabIcon = tab.icon;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 relative py-1 focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-x-3 inset-y-0.5 bg-[#00E676]/10 border border-[#00E676]/20 rounded-xl -z-10"
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                />
              )}

              <TabIcon className={`w-5 h-5 transition-transform duration-300 ${
                isActive ? 'text-[#00E676] scale-110 drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]' : 'text-ink-muted/60 hover:text-ink'
              }`} />

              <span className={`text-[9px] font-bold tracking-tight uppercase ${
                isActive ? 'text-[#00E676]' : 'text-ink-muted/45'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
