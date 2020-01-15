import { getDay } from "date-fns";

class DateUtil {
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
