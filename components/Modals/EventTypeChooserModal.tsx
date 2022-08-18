// Context States
import { ModalState } from "../../context/ModalContext";

// Componentes
import {
    Box,
    Typography,
    Button,
    useTheme,
    Dialog,
    DialogContent,
    IconButton,
    useMediaQuery,
    DialogTitle,
    DialogContentText,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Types
import Note from "../../types/interfaces/Note";
const EventTypeChooserModal = () => {
    // States
    const {
        state: { modalState },
        dispatch: dispatchModal,
    } = ModalState();

    const openAddEventModal = modalState.modalType === "EVENT_CHOOSE" ? true : false;

    // Hooks
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    // Functions
    const closeModal = () => {
        dispatchModal({ type: "HIDE_MODAL" });
    };
    const showModal = (type: string, props: object = {}) => {
        dispatchModal({
            type: "SHOW_MODAL",
            modalType: type,
            modalProps: props,
        });
    };

    return (
        <>
            {openAddEventModal && (
                <Dialog
                    open={openAddEventModal}
                    onClose={closeModal}
                    fullScreen={fullScreen}
                >
                    <DialogTitle
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                            pl: 3,
                            pr: 1,
                        }}
                    >
                        <Typography variant="body1">Select</Typography>
                        <IconButton onClick={closeModal} disableRipple>
                            <CloseIcon sx={{ fontSize: 30, color: theme.palette.primary.contrastText, }} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ p: 0.5 }}>
                        <Box sx={{ width: "100%", p: 2, display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column' }}>
                            {/* <Divider sx={{ width: "100%", borderBottomWidth: 2, borderColor: event.color }} /> */}
                            {/* <DialogContentText sx={{whiteSpace:"pre-line"}}></DialogContentText> */}
                            <Button
                                color="primary"
                                onClick={() => {
                                    showModal("NEW_EVENT", { tabId: 0 })
                                }}
                                sx={{ m: 1 }}
                            >
                                Add a new Event
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    showModal("NEW_EVENT", { tabId: 1 })

                                }}
                                sx={{ m: 1 }}
                            >
                                Add a new Task
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    showModal("NEW_EVENT", { tabId: 2 })

                                }}
                                sx={{ m: 1 }}
                            >
                                Add a new Reminder
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    showModal("NEW_NOTE")

                                }}
                                sx={{ m: 1 }}
                            >
                                Add a new Note
                            </Button>
                        </Box>
                    </DialogContent>

                </Dialog>
            )}
        </>
    );
};

export default EventTypeChooserModal;
