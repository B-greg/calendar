import { Tooltip } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import React, { FC } from "react";

const useStyles = makeStyles(
  theme => ({
    calendarCard: {
      width: "80px",
      height: "80px",
      rounded: "false",
      borderColor: theme.palette.divider,
      borderStyle: "solid",
      borderWidth: theme.spacing(0, 0, 0.2, 0),
      [theme.breakpoints.down("xs")]: {
        width: "auto",
        margin: theme.spacing(0, 4),
        rounded: "true",
        justifyContent: "flex-start"
      }
    },
    calendarDate: {
      [theme.breakpoints.down("xs")]: {
        width: "80px"
      }
    },
    mark: {
      "&::before": {
        [theme.breakpoints.up("sm")]: {
          content: "''",
          top: 0,
          left: 0,
          position: "absolute",
          borderColor: "transparent",
          borderStyle: "solid",
          borderWidth: theme.spacing(2, 2, 0, 0),
          borderTopColor: theme.palette.secondary.main
        }
      }
    },
    calendarEvent: {
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    hidden: {
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
  const downSm = useMediaQuery(theme.breakpoints.down("xs"));

  const hideToolTip = () => {
    return event === undefined || downSm;
  };
  const isButtonDisabled = () => {
    return date === undefined;
  };
  const isButtonHidden = () => {
    return date === undefined && downSm;
  };
  const isMarkDisplay = () => {
    return event !== undefined;
  };

  return (
    <Tooltip title={hideToolTip() ? "" : event} arrow>
      <ButtonBase
        className={clsx(classes.calendarCard, {
          [classes.mark]: isMarkDisplay(),
          [classes.hidden]: isButtonHidden()
        })}
        onClick={onClick}
        focusRipple={true}
        disabled={isButtonDisabled()}
      >
        <Typography variant="h5" className={classes.calendarDate}>
          {date}
        </Typography>
        <Typography
          component="body"
          variant="body1"
          className={classes.calendarEvent}
        >
          {event}
        </Typography>
      </ButtonBase>
    </Tooltip>
  );
};

export default DayCard;
