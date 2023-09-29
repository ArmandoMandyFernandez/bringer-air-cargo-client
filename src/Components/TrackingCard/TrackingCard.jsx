import React, { useState, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./TrackingCard.scss";
import { Grid, Paper, Modal, Card } from "@mui/material";

function TrackingCard({ onStatusUpdate }) {
    const formRef = useRef();
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // input handler
    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    // form submit handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // grabbing data from the API and updating the state which then passes it to the parent Page-Tracking and then to the child TrackingStatus
        try {
            // dynamically updating the tracking number to whatever is inputted
            const response = await axios.get(
                `https://bringer-air-cargo-server.onrender.com/tracking_parcel/${trackingNumber}`
            );
            // updating the state of the tracking data
            setTrackingData(response.data);
            // if data and status is received then update onStatusUpdate
            if (response.data && response.data.status) {
                onStatusUpdate(response.data);
            }
        } catch (error) {
            console.error("Error fetching tracking data:", error);
        }
        // updating state for form
        setFormSubmitted(true);
    };

    // Modal open Handler
    const handleMapOpen = () => {
        setModalOpen(true);
    };

    // Modal close handler
    const handleMapClose = () => {
        setModalOpen(false);
    };
    // eslint-disable-next-line no-unused-vars
    console.log(formSubmitted)
    // eslint-disable-next-line no-unused-vars
    console.log(trackingData)


    return (
        <Paper className="trackingCard" fullWidth={true}>
            <Modal
                open={modalOpen}
                onClose={handleMapClose}
                className="trackingCard_modal"
            >
                <Card className="trackingCard_modal-card">
                    <Button
                        onClick={handleMapClose}
                        size="medium"
                        variant="contained"
                        color="primary"
                        margin="dense"
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 40,
                            padding: "1rem",
                            marginBottom: '1rem'
                        }}
                    >
                        Hide Map
                    </Button>
                    <Card
                        size="md"
                        elevation={3}
                        sx={{
                            position: "absolute",
                            top: 70,
                            right: 40,
                            padding: "1rem",
                        }}
                        classname="trackingCard_inside"
                    >
                        <form ref={formRef} onSubmit={handleFormSubmit}>
                            <TextField
                                type="text"
                                name="tracking_id"
                                id="tracking_id"
                                label="Tracking Number"
                                variant="standard"
                                value={trackingNumber}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                                style={{ margin: "1rem 0" }}
                            >
                                Search
                            </Button>
                        </form>
                    </Card>
                </Card>
            </Modal>
            <Grid style={{ margin: "1rem 0" }} centered>
                <Grid
                    xs
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: "1rem 0" }}
                    centered
                >
                    <Typography
                        variant="h5"
                        component="div"
                        margin="dense"
                        centered
                    >
                        BPS Tracking
                    </Typography>
                    <Typography variant="subtitle1">
                        Enter your tracking number
                    </Typography>
                </Grid>
                <Grid style={{ margin: "1rem 0" }} fullWidth>
                    <form ref={formRef} onSubmit={handleFormSubmit}>
                        <TextField
                            type="text"
                            name="tracking_id"
                            id="tracking_id"
                            label="Tracking Number"
                            variant="standard"
                            fullWidth
                            value={trackingNumber}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            fullWidth
                            style={{ margin: "1rem 0" }}
                        >
                            Search
                        </Button>
                    </form>
                </Grid>
                <Grid style={{ margin: "1rem 0" }}>
                    <Button
                        onClick={handleMapOpen}
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        Show Map
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TrackingCard;
