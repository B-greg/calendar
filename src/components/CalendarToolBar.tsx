import { IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import clsx from "clsx";
import React, { FC } from "react";
import Month from "../types/Month";

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
        disabled={selectedMonth >= 11}
      >
        <NavigateNextIcon />
      </IconButton>
    </Toolbar>
  );
};

export default CalendarToolBar;
