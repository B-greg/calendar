import React, { FC, useState, ChangeEventHandler } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, IconButton, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Month from "../types/Month";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    ToolbarCenter: {
        justifyContent: "center"
      }
}));

interface CalendarToolBarProps {
    className?: string
    year: number,
    selectedMonth: number,
    nextMonth: () => void
    previousMonth: () => void
}

const CalendarToolBar: FC<CalendarToolBarProps> = props => {
  const {year , selectedMonth, nextMonth, previousMonth, className} = props;
  const classes = useStyles(props);

  return (
    <Toolbar className={clsx(classes.ToolbarCenter, className)}>
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
  );
};

export default CalendarToolBar;
