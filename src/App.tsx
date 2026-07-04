/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/AuthScreen';
import HomeApp from './components/HomeApp';
import { Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { account, isLoggedIn, register, login, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const triggerWelcome = () => {
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 2200);
  };

  const handleRegister = (displayName: string, username: string, password: string) => {
    const result = register(displayName, username, password);
    if (result.ok) triggerWelcome();
    return result;
  };

  const handleLogin = (username: string, password: string) => {
    const result = login(username, password);
    if (result.ok) triggerWelcome();
    return result;
  };

  // --- Compuerta de acceso: sin sesión, mostrar login/registro ---
  if (!isLoggedIn || !account) {
    return (
      <AuthScreen
        account={account}
        onRegister={handleRegister}
        onLogin={handleLogin}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-app text-ink flex justify-center overflow-x-hidden md:items-start md:py-8">

      {/* Overlay de bienvenida tras iniciar sesión */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-app flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#00E676] to-[#2ECC71] flex items-center justify-center shadow-2xl shadow-[#00E676]/30"
            >
              <Leaf className="w-10 h-10 text-black" />
            </motion.div>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-widest text-[#00E676] font-extrabold">Bienvenido</p>
              <h1 className="text-2xl font-black text-ink mt-1">{account.displayName}</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resplandor de fondo sutil (solo estético) */}
      <div className="fixed top-[8%] left-[15%] w-[420px] h-[420px] bg-[#00E676]/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[12%] w-[360px] h-[360px] bg-[#2ECC71]/4 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* La app real, con estado aislado por usuario (key = usuario) */}
      <HomeApp
        key={account.username}
        username={account.username}
        displayName={account.displayName}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogout={logout}
      />
    </div>
  );
}
