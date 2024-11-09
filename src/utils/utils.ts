import {Habit} from "../types/types.ts";

export const getDateString = (date: Date) => {
  /* returns dd.mm */
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}


export const getDateHabits = (date: Date, habits: Habit[]): Habit[] => {
  return habits.filter((habit) => {
    if (habit.notificationsStartFrom.getTime() <= date.getTime()) {
      if (habit.repeatEveryType === 'hour') {
        return true;
      } else if (habit.repeatEveryType === 'day') {
        return true;
      } else if (habit.repeatEveryType === 'week') {
        return date.getDay() === habit.notificationsStartFrom.getDay();
      } else if (habit.repeatEveryType === 'month') {
        return date.getDate() === habit.notificationsStartFrom.getDate();
      }
    }
    return false;

  });

}