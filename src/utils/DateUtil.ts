import { getDay, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

class DateUtil {
  static getListOfDayFromMonth(date: Date): Date[] {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
  }

  static getDayOfTheWeek(firstMonthDay: Date): number {
    var day = getDay(firstMonthDay) - 1;
    if (day === -1) {
      return 6;
    } else {
      return day;
    }
  }
}

export default DateUtil;
