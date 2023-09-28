import React, { useState, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./TrackingCard.scss";
import { Grid, Paper } from "@mui/material";

function TrackingCard({ onStatusUpdate }) {
    const formRef = useRef();
    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);


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
                `http://localhost:8888/tracking_parcel/${trackingNumber}`
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

    console.log(trackingData)
    console.log(formSubmitted)

    return (
        <Paper className="trackingCard" fullWidth={true} >
            <Grid style={{margin: "1rem 0"}}centered>
                <Grid 
                xs 
                display="flex" flexDirection="column" justifyContent="center" alignItems="center" 
                style={{margin: "1rem 0"}}centered>
                    <Typography 
                    variant="h5" component="div"  margin="dense" 
                    centered>
                        BPS Tracking
                    </Typography>
                    <Typography variant="subtitle1">
                        Enter your tracking number
                    </Typography>
                </Grid>
                <Grid  style={{margin: "1rem 0"}}fullWidth>
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
                            style={{margin: "1rem 0"}}
                        >
                            Search
                        </Button>
                    </form>
                </Grid>
                <Grid style={{margin: "1rem 0"}}>
                    <Button variant="outlined" color="primary" fullWidth>
                        Show Map
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TrackingCard;
