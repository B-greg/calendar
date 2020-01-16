import React, { useState } from "react";
import logo from "./logo.svg";
import CalendarCard from "./components/CalendarCard";
import CalendarToolBar from "./components/CalendarToolBar";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate} from "./utils/DateUtil";

import {
  AppBar,
  Grid
} from "@material-ui/core";

import { getMonth, getYear } from "date-fns";
import Month from "./types/Month";
import clsx from "clsx";
import EventForm from "./components/EventForm";
import DateFrom from "./types/DateForm";

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
  const [dateFrom, setDateFrom] = useState<DateFrom>({
    date: "",
    description: ""
  });

  const saveForm = (dateFrom: DateFrom) => {
    console.log("form", dateFrom);
    setCalendarEvent(
      new Map<string, string>(
        calendarEvent.set(dateFrom.date, dateFrom.description)
      )
    );
    console.log("calendarEvent", calendarEvent);
  };

  const nextMonth = () => {
    setSelectedMonth(selectedMonth + 1);
  };

  const previousMonth = () => {
    setSelectedMonth(selectedMonth - 1);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const calendarDateClick = (date: Date) => {
    if (date !== undefined) {
      setDateFrom({
        date: formatDate(date),
        description: calendarEvent.get(formatDate(date)) || ""
      });
      setOpenForm(true);
    }
  };

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
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CalendarCard
          month={selectedMonth}
          calendarEvent={calendarEvent}
          onClick={date => calendarDateClick(date)}
        />
      </Grid>
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
        onSave={data => saveForm(data)}
      />
    </>
  );
};

export default App;
