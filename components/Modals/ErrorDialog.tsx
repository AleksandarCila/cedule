import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Types
interface IAlertDialog {
  open: boolean;
  handleClick(): void;
}
export default function AlertDialog({ open, handleClick }: IAlertDialog) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="error-dialog"
        aria-describedby="server-error-dialog"
      >
        <DialogTitle id="error-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            There was an error loading Notes and Calendars. Check your internet
            connection and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} autoFocus>
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
