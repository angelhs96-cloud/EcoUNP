/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * useState con persistencia automática en localStorage.
 *
 * Lee el valor inicial desde localStorage (si existe) y guarda
 * cualquier cambio posterior. Tolera modo incógnito y cuotas llenas
 * sin romper la app.
 *
 * @param key   Clave única en localStorage (usar prefijo con versión y usuario).
 * @param initialValue  Valor por defecto (o función que lo produce) si no hay nada guardado.
 */
export function usePersistentState<T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const resolveInitial = (): T =>
      typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : resolveInitial();
    } catch {
      return resolveInitial();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Cuota excedida o modo incógnito restringido: ignorar silenciosamente
    }
  }, [key, value]);

  return [value, setValue];
}
