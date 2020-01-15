import React, { FC } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DayCard from "./DayCard";
import {
  getMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getWeeksInMonth,
  getWeekOfMonth,
  getDay
} from "date-fns";
import DateUtil from "../utils/DateUtil"

const useStyles = makeStyles(
  theme => ({
    calendar: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "560px",
        flexFlow: "row",
        [theme.breakpoints.down('sm')]: {
          flexFlow: "column",
          width: "100%",
        },
      },
    calendarWeek: {
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down('sm')]: {
        flexFlow: "column"
      },
    }
  }),
  { name: "CalendarCard" }
);

interface CalendarCardProps {
  month: number;
}

const CalendarCard: FC<CalendarCardProps> = props => {
  const { month } = props;
  const classes = useStyles(props);
  const firstMonthDay = new Date(2020, month, 1);
  const allDayOfCurrentMonth = eachDayOfInterval({
    start: startOfMonth(firstMonthDay),
    end: endOfMonth(firstMonthDay)
  });


  var firstDayOfWeek = DateUtil.getDayOfTheWeek(firstMonthDay);
  return (
    <div className={classes.calendar}>
      {[...Array(42)].map((_, index) => (
            <DayCard key={index} date={allDayOfCurrentMonth[index - firstDayOfWeek]?.getDate()} />
      ))}
    </div>
  );
};

export default CalendarCard;
