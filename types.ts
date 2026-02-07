
export type Difficulty = 'Fácil' | 'Moderado' | 'Difícil';
export type ActivityType = 'run' | 'rest' | 'strength' | 'intervals';

export interface DayActivity {
  day: string; // "Lun", "Mar", etc.
  title: string;
  type: ActivityType;
  description: string;
  duration?: string;
  completed?: boolean;
  isToday?: boolean;
}

export interface RunningRoute {
  id: string;
  name: string;
  distance: number;
  difficulty: Difficulty;
  elevation: number;
  description: string;
  location: { lat: number; lng: number };
  image: string;
}

export interface TrainingPlan {
  id: string;
  title: string;
  objective: string;
  durationWeeks: number;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  description: string;
  weeklySchedule?: DayActivity[];
}

export interface Activity {
  id: string;
  date: string;
  distance: number; // km
  duration: number; // seconds
  calories: number;
  averagePace: string;
  routeId?: string;
}

export interface UserStats {
  totalKm: number;
  totalTime: number;
  totalRuns: number;
  personalBest5k: string;
}
