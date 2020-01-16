import { getDay, eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";

export function getListOfDayFromMonth(date: Date): Date[] {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
  }

  export function getDayOfTheWeek(firstMonthDay: Date): number {
    var day = getDay(firstMonthDay) - 1;
    if (day === -1) {
      return 6;
    } else {
      return day;
    }
  }

  export function formatDate(date: Date): string {
    try{
      return format(date, 'd LLLL yyyy');
    } catch {
      return "";
    }
  }

