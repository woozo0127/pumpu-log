import { create } from 'zustand';
import type { WorkoutSession } from '~/shared/types/workout';

interface WorkoutHistoryState {
  sessions: WorkoutSession[];
  addSession: (session: WorkoutSession) => void;
  getRecentSessions: (limit: number) => WorkoutSession[];
  reset: () => void;
}

export const useWorkoutHistoryStore = create<WorkoutHistoryState>((set, get) => ({
  sessions: [],
  addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
  getRecentSessions: (limit) => {
    return [...get().sessions]
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
      .slice(0, limit);
  },
  reset: () => set({ sessions: [] }),
}));
