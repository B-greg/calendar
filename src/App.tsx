import React, { useState } from "react";
import logo from "./logo.svg";
import CalendarCard from "./components/CalendarCard";
import CalendarToolBar from "./components/CalendarToolBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge
} from "@material-ui/core";

import { getMonth, getYear } from "date-fns";
import Month from "./types/Month";
import clsx from "clsx";
import EventForm from "./components/EventForm";
import DateFrom from './types/DateForm'

const useStyles = makeStyles(theme => ({
  bottomBar: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));
const App: React.FC = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const year = getYear(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(getMonth(currentDate));
  const [calendarEvent, setCalendarEvent] = useState(new Map<string, string>());
  const [openForm, setOpenForm] = useState(false);
  const [dateFrom, setDateFrom] = useState<DateFrom>({date: "", description: ""})

  const saveForm = (dateFrom: DateFrom) => {
    console.log("form", dateFrom);
    setCalendarEvent(new Map<string, string>(calendarEvent.set(dateFrom.date,dateFrom.description)));
    console.log("calendarEvent", calendarEvent);
  }

  const nextMonth = () => {
    setSelectedMonth(selectedMonth + 1);
  };

  const previousMonth = () => {
    setSelectedMonth(selectedMonth - 1);
  };

  const closeForm = () => {
    setOpenForm(false);
  }

  const calendarDateClick = (date: Date) => {
    console.log("date", date);
    console.log("calendarEvent.get(date)", calendarEvent.get(date.toDateString()) || "qqqqq");
    setDateFrom({date: date.toDateString(), description: calendarEvent.get(date.toDateString()) || ""})
    setOpenForm(true);

  }

  return (
    <>
      <AppBar position="static">
        <CalendarToolBar
          year={year}
          selectedMonth={selectedMonth}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
        />
      </AppBar>
      <CalendarCard
        month={selectedMonth}
        calendarEvent={calendarEvent}
        onClick={(date) => calendarDateClick(date)}
      />
      <CalendarToolBar
        className={classes.bottomBar}
        year={year}
        selectedMonth={selectedMonth}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
      />
      <EventForm
        open={openForm}
        date={dateFrom.date}
        eventDescription={dateFrom.description}
        onClose={closeForm}
        onSave={(data) => saveForm(data)}
      />
    </>
  );
};

export default App;
