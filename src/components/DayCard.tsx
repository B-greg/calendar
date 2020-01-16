import React, { FC } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(
  theme => ({
    calendarDay: {
      width: "80px",
      height: "80px",
      rounded: "false",
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        margin: theme.spacing(1, 4),
        rounded: "true",
        "&:empty": {
          display: "none"
        }
      }
    }
  }),
  { name: "DayCard" }
);

interface DayCardProps {
  date: number | undefined;
  event?: string;
  onClick?: () => void
}

const DayCard: FC<DayCardProps> = props => {
  const { date, event, onClick } = props;
  const theme = useTheme();
  const classes = useStyles(props);
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      className={classes.calendarDay}
      variant={downSm ? "outlined" : undefined}
      square={!downSm}
      elevation={downSm ? 3 : 0}
      onClick={onClick}
    >
      {date}{event}
    </Paper>
  );
};

export default DayCard;
