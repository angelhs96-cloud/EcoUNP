/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentInfo, RecycledAction, EducationalModule, VolunteerEvent, RewardItem, QuizQuestion } from './types';

export const initialStudent: StudentInfo = {
  name: "Daniel Huertas",
  studentId: "UNP-2024-8420",
  career: "Computer Engineering Student",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4x2mVZbk7zgD6bp503L1bKNggiSgSXj-U4ivzCOd6LW46ULouKoB65RkpI-8hUQNjythnljxznt__57YHXfps8tbFy755u6WYiR0FqtQ4bTFHLOmQeBojdyeLsV2UE1Et8JZudlERctD9VU5Ncwj0QwOiKHZQmIv7KV6squSZS7NKU5_dG9IIbRB3RrzzAOGsp4YinJRpO_EoHei9z1p5-1Wgrdhgf77F3p7_TPZYHC1wT4SrsmvVXVTbe2P7vkIci4crOilmA",
  level: 12,
  levelName: "Defensor del Campus • Rango Élite",
  points: 450,
  impactScore: 8420,
  globalRank: 42,
  weeklyStreakCount: 5,
  weeklyStreakDays: [
    { day: "L", value: "checked", label: "Lunes" },
    { day: "M", value: "checked", label: "Martes" },
    { day: "M", value: "checked", label: "Miércoles" },
    { day: "J", value: "checked", label: "Jueves" },
    { day: "V", value: "active", label: "Viernes" },
    { day: "S", value: "empty", label: "Sábado" },
    { day: "D", value: "empty", label: "Domingo" }
  ],
  dailyProgressPercentage: 75
};

export const initialHistoryActions: RecycledAction[] = [
  {
    id: "action-1",
    title: "Reciclaje de botella PET",
    points: 10,
    date: "Ayer, 14:30",
    icon: "recycling"
  },
  {
    id: "action-2",
    title: "Uso de tomatodo personal",
    points: 5,
    date: "Lunes, 09:15",
    icon: "water"
  },
  {
    id: "action-3",
    title: "Transporte sostenible (Bicicleta)",
    points: 15,
    date: "Domingo, 18:00",
    icon: "bike"
  },
  {
    id: "action-4",
    title: "Ahorro de energía en laboratorio",
    points: 8,
    date: "Sábado, 20:45",
    icon: "zap"
  }
];

export const initialModules: EducationalModule[] = [
  {
    id: "mod-1",
    title: "Economía Circular en 1 min",
    readTime: "1 MIN READ",
    pointsValue: 20,
    status: "active",
    description: "Aprende los fundamentos de reducir, reusar y reciclar en entornos urbanos universitarios.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEbjOY74pzFMeu0DsKF7H2lpzRCXRNtWYWsNvZ5sPJlE4xccWxXsF0Td9X9WoAWL3scaqdbxMiU9NcfVpk1UGgKXFJ99H5X7bIIyJOdwuxakI5iT-3-rK2UuxnLFu8WfoBOdo1Ewq20PvYcTwFbsUN-TIm_ugnZmKj-dELTDdrMkrzD_bzO54EOPHbaZ9MXk6SjzoRRT7tKOO8twFlC9imYbPu_OxQ8JWZatCUaOA3Gh--xhBA7pZsenjgkW00iBRfIVg2t1YeHg",
    category: "Economía Circular • Básico",
    progressPercentage: 40
  },
  {
    id: "mod-2",
    title: "Gestión de RAEE",
    readTime: "3 MIN READ",
    pointsValue: 35,
    status: "completed",
    description: "Manejo correcto de Residuos de Aparatos Eléctricos y Electrónicos dentro del campus.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClDp8Wv3xt0RGkmM64YEP_NmGF9V1QP3Qxya0ScBGVk10tTTfUr_BCeEsBkLw5EeoM9iHdR3Zho6k5YskBxOBMaXdxG22wTW5X6Xf1EpMKPrg44jToZqZpWnDJBOmIcTFUnLMRYuQJ-9DQoKywqEj3M7tSHiY5rOe8Tz00w292LJl9BZ5-PbHpqksXxy0EYYNIpmGB9tLbdDr8wYkwpYWX4cDUtWRg388Tle3V8D2GwadJmLUOWSv4WmLnWSB22OFgjEA3HDzBkA",
    category: "Residuo Electrónico • Intermedio",
    progressPercentage: 100
  },
  {
    id: "mod-3",
    title: "Energías Limpias U.",
    readTime: "5 MIN READ",
    pointsValue: 50,
    status: "locked",
    description: "Transición energética y su impacto real en la reducción de huella de carbono del campus.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7PblABa6hU0aZGk0W1Mg-5GV-cM5vTsVq6Q1Y-VKMNsy3m8rcY8RK8dz7onuiFdPz9j7VmrviirzTj1lyz6rIS-LJ1fKQtDZ5KlKGPLZILS5Xu3zplTw4SW1JSs8-knkPy8LYXWFLwp35YENdtQphT4oYWStLPUPxx_hhbemVSqG76E6ePQBBLw3HJS4IkPjsiw3hVsRTkZwbInKDboiykdpBi4-TEPMnjxXwLpkmeDNRAYKYE1-XC6AsvDZ-KeiPTWJqSZJQPw",
    category: "Energía Renovable • Avanzado",
    levelRequired: 15
  }
];

export const initialEvents: VolunteerEvent[] = [
  {
    id: "evt-1",
    title: "Campaña de Limpieza",
    date: "Oct 15",
    time: "08:00 AM",
    slotsCurrent: 12,
    slotsMax: 20,
    pointsCost: 100,
    description: "Únete a nosotros para limpiar las áreas verdes alrededor de la biblioteca central de la UNP. Se proporcionarán herramientas, guantes y refrigerios para todos los participantes inscritos.",
    state: "Disponible",
    icon: "sparkles"
  },
  {
    id: "evt-2",
    title: "Reforestación Campus",
    date: "Oct 22",
    time: "09:30 AM",
    slotsCurrent: 45,
    slotsMax: 50,
    pointsCost: 150,
    description: "Ayuda a plantar 50 nuevos árboles nativos en el sector norte del campus universitario. Contribuiremos directamente a expandir los pulmones verdes de nuestra facultad.",
    state: "Disponible",
    icon: "tree"
  }
];

export const initialRewards: RewardItem[] = [
  {
    id: "rew-1",
    title: "Free Coffee & Pastry",
    points: 200,
    category: "Cafetería Discount",
    description: "Válido en la cafetería del campus principal. Incluye café americano mediano o infusión y una empanada de cortesía. Límite de un canje de cortesía por día.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEqyNGnVc0ds3q5H8JiOETeD90LEhx2OIcOE51NsVULmERLiqI6uCLj41U5iw00ephj6uqaJLSeUAQaM3TFvkDy_JHBMpjMdRPRQyzJA7CzOmm6VIUfIUJIHtSWdMbYEgF0hEwrWhwSC7svN5WSYVJuFhzcOQyiVqCvZSPMkXYrjmRDV8H9tsIhN4gz2xj8GxtoQdwxkznqTc55u6dsz0IutCu-zFBtSpu3kXeHkFh7rLuU5nGFLXW169znHv8OKjBNsrnsiiPtw",
    icon: "coffee",
    unlocked: true
  },
  {
    id: "rew-2",
    title: "EcoUNP Official T-Shirt",
    points: 500,
    category: "University Merch",
    description: "Camiseta oficial confeccionada con algodón 100% orgánico reciclado. Luce tu compromiso por la sostenibilidad y la UNP en tus clases.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIat3HSFkGtz5-q2iymMeAH2yW76PxrNk3cJ5nyioWKlseBFC5HfiNTfqHmlu5px5qIhUoZpv3p3YUWqwxP1zrZdtgW6B9pV1mN9nFtmrNkGGI0b30YGzi3T8pQkDVEXUNYDBH7afBacPdrr5LL8leHWvI2J-8JbexgxoIsCKmmys25qUNfuMNbtOgozdGg9iJd2kSyzVhUr17QnD09dNsWhgcwvyVVPOHmJOJ4bZXWtX9_Qfn2gargqgUxEcOGKtvSd6XmNDK4g",
    icon: "shirt",
    unlocked: true,
    progressPercentage: 90
  },
  {
    id: "rew-3",
    title: "Extended Book Loan",
    points: 1000,
    category: "Library Benefit",
    description: "Extiende el préstamo regular de hasta tres libros académicos por 14 días adicionales libres de multas o demoras. Coordinado directamente con la biblioteca central.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC19SUfhWLFztMzYD6koGZKHwfP9iuHc_K4iiFLaHm0yfLE3P3a8kN9lsBOVhKxEo8NDaCoFUTvlQpQLNT2fYnHNWVr8rGXq5OiV1DZQMmO_9fLwwraIiy17HRMARvnFLwL_zK18M4N2Z7JXx4YVLwYqbCxR7tDUavUM_9SMOhUHyHWBOpXJyafn70K0j5JBap8cyvY071ySvMrciNin0nPpC1sfqO-NiwMWeIXuG4uFDyfcy2oeoxntrS10ZbtPBlyu7Z4y4v-OQ",
    icon: "book",
    unlocked: false,
    progressPercentage: 45
  }
];

export const circularQuiz: QuizQuestion[] = [
  {
    question: "¿Cuál de las siguientes opciones describe mejor el concepto de Economía Circular?",
    options: [
      "Un modelo económico lineal de extraer, producir, consumir y desechar sin límites.",
      "Un sistema de producción y consumo para reparar, reutilizar, reciclar y valorizar materiales existentes el mayor tiempo posible.",
      "Un método financiero para aumentar el flujo de monedas en círculos comerciales cerrados.",
      "Un proceso de incineración a cielo abierto para desechar dispositivos electrónicos obsoletos rápidamente."
    ],
    correctIndex: 1,
    explanation: "¡Correcto! La economía circular busca contrastar el modelo tradicional de usar y tirar, promoviendo el rediseño ecológico, la extensión del ciclo de vida y la reinserción de desechos como materias primas."
  },
  {
    question: "¿Qué significan las siglas RAEE en el ámbito ecológico?",
    options: [
      "Redes de Apoyo Ecológico y Estudiantil.",
      "Reglamento Ambiental de Energía Externa.",
      "Residuos de Aparatos Eléctricos y Electrónicos.",
      "Recicladores de Acero y Envases Especializados."
    ],
    correctIndex: 2,
    explanation: "¡Exacto! Los RAEE son residuos de dispositivos que funcionan con corriente eléctrica o baterías. Contienen metales valiosos y sustancias peligrosas que requieren un proceso especial."
  },
  {
    question: "¿Cuál de estos hábitos contribuye de forma más eficiente al concepto de 'Reducir'?",
    options: [
      "Comprar botellas PET de un solo uso todos los días pero colocarlas en el tacho verde.",
      "Utilizar un tomatodo personal reutilizable de aluminio o vidrio durante todo el ciclo universitario.",
      "Imprimir el doble de documentos en papel bond regular sin reciclar.",
      "Dejar las computadoras y proyectores encendidos en modo pasivo toda la noche."
    ],
    correctIndex: 1,
    explanation: "¡Excelente! Utilizar un tomatodo personal reduce radicalmente la generación sistemática de botellas plásticas descartables en el campus."
  }
];

/* ===================================================================
   Plantillas de ARRANQUE EN CERO para cuentas nuevas.
   Un usuario recién registrado empieza sin puntos ni progreso y los
   va construyendo con sus propias acciones. (initialStudent y demás
   quedan solo como datos de referencia/demo.)
=================================================================== */

/** Genera un avatar SVG con la inicial del usuario (sin dependencias externas). */
export function initialAvatar(name: string): string {
  const letter = (name.trim().charAt(0) || 'U').toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='#00E676'/><stop offset='1' stop-color='#2ECC71'/>` +
    `</linearGradient></defs>` +
    `<rect width='96' height='96' rx='48' fill='url(#g)'/>` +
    `<text x='50%' y='53%' font-family='Inter,system-ui,sans-serif' font-size='44' ` +
    `font-weight='800' fill='#052e16' text-anchor='middle' dominant-baseline='middle'>${letter}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Perfil inicial en cero para una cuenta nueva. */
export function createFreshStudent(displayName: string): StudentInfo {
  const year = new Date().getFullYear();
  const code = Math.floor(1000 + Math.random() * 9000);
  return {
    name: displayName,
    studentId: `UNP-${year}-${code}`,
    career: "Estudiante UNP",
    avatarUrl: initialAvatar(displayName),
    level: 1,
    levelName: "Nivel 1 • Recluta Verde",
    points: 0,
    impactScore: 0,
    globalRank: 1000 + Math.floor(Math.random() * 800),
    weeklyStreakCount: 0,
    weeklyStreakDays: [
      { day: "L", value: "empty", label: "Lunes" },
      { day: "M", value: "empty", label: "Martes" },
      { day: "M", value: "empty", label: "Miércoles" },
      { day: "J", value: "empty", label: "Jueves" },
      { day: "V", value: "empty", label: "Viernes" },
      { day: "S", value: "empty", label: "Sábado" },
      { day: "D", value: "empty", label: "Domingo" }
    ],
    dailyProgressPercentage: 0
  };
}

/** Historial vacío para cuentas nuevas. */
export const freshHistoryActions: RecycledAction[] = [];

/** Módulos en su estado inicial: el primero disponible, el resto por desbloquear. */
export const freshModules: EducationalModule[] = initialModules.map((m, idx) => {
  if (idx === 0) return { ...m, status: 'active', progressPercentage: 0 };
  if (m.levelRequired) return { ...m, status: 'locked', progressPercentage: 0 };
  return { ...m, status: 'active', progressPercentage: 0 };
});
