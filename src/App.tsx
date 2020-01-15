import React, { useState } from "react";
import logo from "./logo.svg";
import CalendarCard from "./components/CalendarCard";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { getMonth, getYear } from "date-fns";
import Month from "./types/Month";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  ToolbarCenter: {
    justifyContent: "center"
  }
}));
const App: React.FC = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const year = getYear(currentDate);

  const [selectedMonth, setSelectedMonth] = useState(getMonth(currentDate));

  const nextMonth = () => {
    setSelectedMonth(selectedMonth + 1);
  };

  const previousMonth = () => {
    setSelectedMonth(selectedMonth - 1);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.ToolbarCenter}>
          <IconButton
            aria-label="Before"
            color="inherit"
            disabled={selectedMonth <= 0}
            onClick={previousMonth}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="h6">
            {Month[selectedMonth]} {year}
          </Typography>
          <IconButton
            aria-label="Next"
            color="inherit"
            onClick={nextMonth}
            disabled={selectedMonth > 10}
          >
            <NavigateNextIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CalendarCard month={selectedMonth} />
    </>
  );
};

export default App;
