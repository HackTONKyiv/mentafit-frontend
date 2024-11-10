import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {Habit} from "../types/types.ts"; // required for devtools typing

interface CalendarStore {
  habits: Habit[]
  currentDate: Date
  increaseDay: () => void
  decreaseDay: () => void
  setHabits: (habits: Habit[]) => void
  setCurrentDate: (date: Date) => void
  setHabitDone: (habitId: number, isDone: boolean) => void
}


export const useCalendarStore = create<CalendarStore>()(
  devtools(
      (set) => ({
        habits: [],
        currentDate: new Date(),
        setCurrentDate: (date: Date) => set((state) => {
          console.log(state.currentDate, date);
          return { currentDate: date }
        }),
        setHabitDone: (habitId: number, isDone: boolean) => set((state) => {
          const habit = state.habits.find((habit) => habit.id === habitId);
          if (habit) {
            habit.done = isDone;
          }
          return { habits: state.habits }
        }),
        increaseDay: () => set((state) => ({ currentDate: new Date(state.currentDate.getTime() + (1000 * 60 * 60 * 24)) })),
        decreaseDay: () => set((state) => ({ currentDate: new Date(state.currentDate.getTime() - (1000 * 60 * 60 * 24)) })),
        setHabits: (habits: Habit[]) => set({ habits }),
      }),
      {
        name: 'calendar-storage',
      },
    ),
);