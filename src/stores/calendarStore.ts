import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {Habit} from "../types/types.ts"; // required for devtools typing

interface CalendarStore {
  habits: Habit[]
  currentDate: Date
  increaseDay: () => void
  decreaseDay: () => void
  setHabits: (habits: Habit[]) => void
}


export const useCalendarStore = create<CalendarStore>()(
  devtools(
      (set) => ({
        habits: [],
        currentDate: new Date(),
        increaseDay: () => set((state) => ({ currentDate: new Date(state.currentDate.getTime() + (1000 * 60 * 60 * 24)) })),
        decreaseDay: () => set((state) => ({ currentDate: new Date(state.currentDate.getTime() - (1000 * 60 * 60 * 24)) })),
        setHabits: (habits: Habit[]) => set({ habits }),
      }),
      {
        name: 'calendar-storage',
      },
    ),
);