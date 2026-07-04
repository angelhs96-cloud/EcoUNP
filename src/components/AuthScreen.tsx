/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Leaf, User, Lock, IdCard, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthResult, Account } from '../hooks/useAuth';

interface AuthScreenProps {
  account: Account | null;
  onRegister: (displayName: string, username: string, password: string) => AuthResult;
  onLogin: (username: string, password: string) => AuthResult;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function AuthScreen({ account, onRegister, onLogin, theme, onToggleTheme }: AuthScreenProps) {
  // Si ya hay cuenta en el dispositivo, arrancamos en modo "ingresar"
  const [mode, setMode] = useState<'login' | 'register'>(account ? 'login' : 'register');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const result = mode === 'register'
      ? onRegister(displayName, username, password)
      : onLogin(username, password);
    if (!result.ok) {
      setError(result.error ?? 'Ocurrió un error.');
    }
  };

  const inputBase =
    'w-full bg-surface2 border border-line rounded-xl pl-10 pr-3 py-3 text-sm text-ink ' +
    'placeholder:text-ink-muted/60 focus:outline-none focus:border-[#00E676]/50 transition-colors';

  return (
    <div className="min-h-[100dvh] w-full bg-app text-ink flex justify-center overflow-x-hidden md:items-start md:py-8">
      <div className="fixed top-[12%] left-[15%] w-[420px] h-[420px] bg-[#00E676]/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[440px] bg-app flex flex-col min-h-[100dvh] md:min-h-0 md:h-[880px] md:rounded-[40px] md:border md:border-line/70 md:shadow-[0_24px_80px_rgba(0,0,0,0.4)] px-6 py-8 justify-center">

        {/* Toggle de tema arriba a la derecha */}
        <button
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-line text-ink-muted hover:text-[#00E676] transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Marca */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#2ECC71] flex items-center justify-center shadow-lg shadow-[#00E676]/25">
            <Leaf className="w-8 h-8 text-black" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-ink tracking-tight">EcoUNP</h1>
            <p className="text-[11px] uppercase tracking-widest text-[#00E676] font-extrabold">
              Billetera Ecológica UNP
            </p>
          </div>
        </motion.div>

        {/* Título del formulario */}
        <div className="mb-5 text-center">
          <h2 className="text-lg font-bold text-ink">
            {mode === 'register' ? 'Crea tu cuenta' : 'Bienvenido de vuelta'}
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            {mode === 'register'
              ? 'Regístrate para empezar a sumar puntos verdes.'
              : `Ingresa para continuar${account ? `, ${account.displayName}` : ''}.`}
          </p>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-3">
          {mode === 'register' && (
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nombre completo"
                className={inputBase}
              />
            </div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              autoCapitalize="none"
              className={inputBase}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              className={inputBase}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs text-[#ff9587] bg-[#ff9587]/10 border border-[#ff9587]/25 rounded-xl px-3 py-2"
          >
            {error}
          </motion.p>
        )}

        {/* Botón principal */}
        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-[#00E676] hover:bg-[#1dec85] text-black font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/25"
        >
          {mode === 'register'
            ? (<><UserPlus className="w-4 h-4" /> Crear cuenta e ingresar</>)
            : (<><LogIn className="w-4 h-4" /> Iniciar sesión</>)}
        </button>

        {/* Cambio de modo */}
        <button
          onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setError(null); }}
          className="mt-4 text-xs text-ink-muted hover:text-ink text-center transition-colors"
        >
          {mode === 'register'
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿Otra cuenta? Regístrate'}
        </button>

        <p className="mt-8 text-[10px] text-ink-muted/60 text-center leading-relaxed">
          Tus datos se guardan solo en este dispositivo.
        </p>
      </div>
    </div>
  );
}
