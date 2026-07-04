/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export interface Account {
  username: string;
  password: string;   // Solo local, sin cifrado (demo). No usar para datos sensibles.
  displayName: string;
}

const ACCOUNT_KEY = 'ecounp.v1.account';
const SESSION_KEY = 'ecounp.v1.session';

function readAccount(): Account | null {
  try {
    const raw = window.localStorage.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

function readSession(): boolean {
  try {
    return window.localStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}

/**
 * Autenticación local basada en localStorage (una cuenta por dispositivo).
 * No es seguridad real: la clave se guarda sin cifrar. Sirve como puerta
 * de acceso para un demo. Migrable a un backend real más adelante.
 */
export function useAuth() {
  const [account, setAccount] = useState<Account | null>(readAccount);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(readSession);

  useEffect(() => {
    try {
      if (account) window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    } catch { /* ignorar */ }
  }, [account]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SESSION_KEY, isLoggedIn ? 'true' : 'false');
    } catch { /* ignorar */ }
  }, [isLoggedIn]);

  const register = (displayName: string, username: string, password: string): AuthResult => {
    const name = displayName.trim();
    const user = username.trim();
    if (!name || !user || !password) {
      return { ok: false, error: 'Completa todos los campos.' };
    }
    if (password.length < 4) {
      return { ok: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
    }
    setAccount({ username: user, password, displayName: name });
    setIsLoggedIn(true);
    return { ok: true };
  };

  const login = (username: string, password: string): AuthResult => {
    if (!account) {
      return { ok: false, error: 'No hay ninguna cuenta creada en este dispositivo.' };
    }
    if (username.trim() !== account.username || password !== account.password) {
      return { ok: false, error: 'Usuario o contraseña incorrectos.' };
    }
    setIsLoggedIn(true);
    return { ok: true };
  };

  const logout = () => setIsLoggedIn(false);

  return { account, isLoggedIn, register, login, logout };
}
