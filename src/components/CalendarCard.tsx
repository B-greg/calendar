import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import {
  formatDate,
  getDayOfTheWeek,
  getListOfDayFromMonth
} from "../utils/DateUtil";
import DayCard from "./DayCard";

const useStyles = makeStyles(
  theme => ({
    calendar: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: theme.spacing(2),
      width: "560px",
      flexFlow: "row",
      [theme.breakpoints.down("xs")]: {
        flexFlow: "column",
        width: "100%"
      }
    },
    calendarWeek: {
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        flexFlow: "column"
      }
    }
  }),
  { name: "CalendarCard" }
);

interface CalendarCardProps {
  year: number;
  month: number;
  calendarEvent: Map<string, string>;
  onClick: (date: Date) => void;
}

const CalendarCard: FC<CalendarCardProps> = props => {
  const { year, month, calendarEvent, onClick } = props;
  const classes = useStyles(props);
  
  const firstMonthDay = new Date(year, month, 1);
  const allDayOfCurrentMonth = getListOfDayFromMonth(firstMonthDay);
  const firstDayOfWeek = getDayOfTheWeek(firstMonthDay);

  return (
    <div className={classes.calendar}>
      {[...Array(42)]
        .map((_, index) => allDayOfCurrentMonth[index - firstDayOfWeek])
        .map((currentDay, index) => (
          <DayCard
            key={index}
            date={currentDay?.getDate()}
            event={calendarEvent.get(formatDate(currentDay))}
            onClick={() => onClick(currentDay)}
          />
        ))}
    </div>
  );
};

export default CalendarCard;
