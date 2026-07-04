/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RecycledAction {
  id: string;
  title: string;
  points: number;
  date: string;
  icon: string;
}

export interface VolunteerEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  slotsCurrent: number;
  slotsMax: number;
  pointsCost: number;
  description: string;
  state: 'Disponible' | 'Inscrito';
  icon: string;
}

export interface RewardItem {
  id: string;
  title: string;
  points: number;
  category: string;
  description: string;
  image: string;
  icon: string;
  unlocked: boolean;
  userClaimed?: boolean;
  claimCode?: string;
  progressPercentage?: number;
}

export interface StudentInfo {
  name: string;
  studentId: string;
  career: string;
  avatarUrl: string;
  level: number;
  levelName: string;
  points: number;
  impactScore: number;
  globalRank: number;
  weeklyStreakCount: number;
  weeklyStreakDays: { day: string; value: 'checked' | 'active' | 'empty'; label: string }[];
  dailyProgressPercentage: number;
}

export interface EducationalModule {
  id: string;
  title: string;
  readTime: string;
  pointsValue: number;
  status: 'active' | 'completed' | 'locked';
  description: string;
  image: string;
  category: string;
  progressPercentage?: number;
  levelRequired?: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
