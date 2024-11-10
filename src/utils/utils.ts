import {Habit} from "../types/types.ts";

export const getDateString = (date: Date) => {
  /* returns dd.mm */
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}


export const getDateHabits = (date: Date, habits: Habit[]): Habit[] => {
  return habits.filter((habit) => {
    if (habit.repeatEveryType === 'hour') {
      return true;
    }

    const dateCopy = new Date(date.getTime())
    const habitDateCopy = new Date(habit.notificationsStartFrom.getTime())
    if (habit.notificationsStartFrom.getTime() <= date.getTime()) {
      if (habit.repeatEveryType === 'day') {
        const diff = dateCopy.setHours(0, 0, 0, 0) - habitDateCopy.setHours(0, 0, 0, 0);
        // +2 to fix the issue when the habit was created today.
        const days = diff / (1000 * 60 * 60 * 24) + 1; // By changing this parameter you can change when the first time will be shown
        return days % habit.repeatEveryCount < 1;
      } else if (habit.repeatEveryType === 'week') {
        const diff = dateCopy.setHours(0, 0, 0, 0) - habitDateCopy.setHours(0, 0, 0, 0);
        const days = diff / (1000 * 60 * 60 * 24);
        const daysInWeek = 7;
        if (days < daysInWeek) {
          return false;
        }
        return days % (habit.repeatEveryCount * daysInWeek) === 0;
      } else if (habit.repeatEveryType === 'month') {
        const diff = dateCopy.setHours(0, 0, 0, 0) - habitDateCopy.setHours(0, 0, 0, 0);
        const days = diff / (1000 * 60 * 60 * 24);
        const daysInMonth = 30;
        if (days < daysInMonth) {
          return false;
        }
        return days % (habit.repeatEveryCount * daysInMonth) === 0;
      }
    }
    return false;

  });

}