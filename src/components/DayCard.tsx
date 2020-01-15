import React, { FC } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    calendarDay: {
        width: '80px',
        height: '80px',
        [theme.breakpoints.down('sm')]: {
            width: "100%",
          },
    }
}), { name: "DayCard" });

interface DayCardProps {
  date: number | undefined;
}

const DayCard: FC<DayCardProps> = props => {
  const { date } = props;
  const classes = useStyles(props);
  return <div className={classes.calendarDay}>{date}</div>;
};

export default DayCard;
