
import { RunningRoute, TrainingPlan } from './types';

export const VIGO_ROUTES: RunningRoute[] = [
  {
    id: 'lagares',
    name: 'Paseo del Lagares',
    distance: 8.5,
    difficulty: 'Fácil',
    elevation: 45,
    description: 'Ruta llana a lo largo del río Lagares. Ideal para entrenamientos de ritmo constante.',
    location: { lat: 42.213, lng: -8.745 },
    image: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'samil',
    name: 'Samil - Alcabre',
    distance: 5.2,
    difficulty: 'Fácil',
    elevation: 20,
    description: 'Vistas espectaculares a las Islas Cíes. Terreno mixto de acera y carril bici.',
    location: { lat: 42.221, lng: -8.775 },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'castro',
    name: 'Monte de O Castro',
    distance: 3.0,
    difficulty: 'Difícil',
    elevation: 150,
    description: 'Circuito exigente con cuestas pronunciadas y escaleras. Perfecto para mejorar potencia.',
    location: { lat: 42.235, lng: -8.726 },
    image: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&w=400&q=80'
  }
];

export const TRAINING_PLANS: TrainingPlan[] = [
  {
    id: '5k-beg',
    title: 'Mi primer 5K',
    objective: 'Terminar 5km sin parar',
    durationWeeks: 8,
    level: 'Principiante',
    description: 'Un plan progresivo para fortalecer tus piernas.',
    weeklySchedule: [
      { day: 'Lun', title: 'Descanso Activo', type: 'rest', description: 'Caminata suave de 20 min.', completed: true },
      { day: 'Mar', title: 'Caco (Caminar-Correr)', type: 'run', description: '3 min correr + 2 min caminar (x5)', duration: '25 min', completed: true },
      { day: 'Mié', title: 'Fortalecimiento', type: 'strength', description: 'Core y sentadillas en casa.', completed: false, isToday: true },
      { day: 'Jue', title: 'Caco Progresivo', type: 'run', description: '4 min correr + 1 min caminar (x4)', duration: '20 min' },
      { day: 'Vie', title: 'Descanso Total', type: 'rest', description: 'Recuperación muscular.' },
      { day: 'Sáb', title: 'Tirada Larga', type: 'run', description: 'Trota 15 min constantes por Samil.', duration: '15 min' },
      { day: 'Dom', title: 'Yoga/Estiramientos', type: 'rest', description: 'Mejora de flexibilidad.' },
    ]
  },
  {
    id: '10k-sub50',
    title: '10K Sub 50',
    objective: 'Bajar de 50 minutos',
    durationWeeks: 10,
    level: 'Intermedio',
    description: 'Enfoque en series de velocidad.',
    weeklySchedule: [
      { day: 'Lun', title: 'Rodaje Suave', type: 'run', description: '8km a ritmo R1.', completed: true },
      { day: 'Mar', title: 'Series 400m', type: 'intervals', description: '10x400m a 4:15 min/km.', duration: '45 min', isToday: true },
      { day: 'Mié', title: 'Descanso', type: 'rest', description: 'Recuperación.' },
      { day: 'Jue', title: 'Fuerza Explosiva', type: 'strength', description: 'Ejercicios de pliometría.' },
      { day: 'Vie', title: 'Rodaje R2', type: 'run', description: '6km a 5:10 min/km.' },
      { day: 'Sáb', title: 'Tirada Larga', type: 'run', description: '12km por la Senda del Agua.' },
      { day: 'Dom', title: 'Descanso Activo', type: 'rest', description: 'Paseo en bici.' },
    ]
  }
];
