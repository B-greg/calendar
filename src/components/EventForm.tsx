import React, { FC, useState, ChangeEventHandler } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setDate } from "date-fns/esm";

const useStyles = makeStyles(theme => ({}));

interface EventFormProps {
  open: boolean;
  date?: string;
  eventDescription?: string;
  onClose: () => void;
  onSave: (data: { date: string; description: string }) => void;
}

const EventForm: FC<EventFormProps> = props => {
  const { open, date, eventDescription, onClose, onSave } = props;
  const classes = useStyles(props);
  const [description, setDescription] = useState(eventDescription);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const updateDescription: ChangeEventHandler<HTMLInputElement> = event =>
    setDescription(event.target.value);

  const saveEvent = () => {
    if (date !== undefined && description !== undefined) {
      onSave({ date: date, description: description });
    }
    resetToInitState();
    onClose();
  };

  function resetToInitState() {
    setDescription("");
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
      onEnter={() => {
        setDescription(eventDescription);
      }}
    >
      <DialogTitle id="form-dialog-title">{date}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          type="text"
          value={description}
          onChange={updateDescription}
          fullWidth
          inputProps={{
            maxLength: 40
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveEvent} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
