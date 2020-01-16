import React, { FC } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles(
  theme => ({
    calendarCard: {
      width: "80px",
      height: "80px",
      rounded: "false",
      borderColor: "grey",
      borderStyle: "solid",
      borderWidth: theme.spacing(0, 0, 0.2, 0),
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        margin: theme.spacing(0, 4),
        rounded: "true",
        justifyContent: "flex-start"
      }
    },
    calendarDate: {
      [theme.breakpoints.down("sm")]: {
        width: "80px"
      }
    },
    mark: {
      "&::before": {
        [theme.breakpoints.up("md")]: {
          content: "''",
          top: 0,
          left: 0,
          position: "absolute",
          borderColor: "transparent",
          borderStyle: "solid",
          borderWidth: theme.spacing(2, 2, 0, 0),
          borderTopColor: "#dd0000"
        }
      }
    },
    calendarEvent: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    hiden: {
      display: "none"
    }
  }),
  { name: "DayCard" }
);

interface DayCardProps {
  date: number | undefined;
  event?: string;
  onClick?: () => void;
}

const DayCard: FC<DayCardProps> = props => {
  const { date, event, onClick } = props;
  const theme = useTheme();
  const classes = useStyles(props);
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Tooltip title={event === undefined || downSm ? "" : event} arrow>
      <ButtonBase
        className={clsx(classes.calendarCard, {
          [classes.mark]: event !== undefined,
          [classes.hiden]: date === undefined && downSm
        })}
        onClick={onClick}
        focusRipple={true}
        disabled={date === undefined}
      >
        <Typography component="h5" variant="h5" className={classes.calendarDate}>{date}</Typography>
        <Typography component="body" variant="body1" className={classes.calendarEvent}>{event}</Typography>
      </ButtonBase>
    </Tooltip>
  );
};

export default DayCard;
