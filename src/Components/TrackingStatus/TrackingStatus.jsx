import "./TrackingStatus.scss";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LinkIcon from "@mui/icons-material/Link";
import { Container } from "@mui/material";

function TrackingStatus({ status }) {
    const [showButton, setShowButton] = useState(false);

    // handling the awaiting payment
    useEffect(() => {
        if (
            status &&
            status.parcel_tracking_items &&
            status.parcel_tracking_items.some((item) => {
                const description = getDescription(item);
                return description === "Awaiting payment";
            })
        ) {
            setShowButton(true);
        }
    }, [status]);

    // takes care of a null status and allows you to input the tracking number
    if (!status || (!status.parcel_tracking_items && !status.label)) {
        return null;
    }

    // getting the description from either US or other countries
    function getDescription(item) {
        // first checking if its null to then grab the description for the US
        if (item.location === null) {
            return item.tracking_code &&
                item.tracking_code.tracking_code_locales &&
                item.tracking_code.tracking_code_locales.length > 0
                ? item.tracking_code.tracking_code_locales[0].description
                : "N/A";
        } else if (
            // then if its not null go to grab the description from the other path
            item.tracking_code_vendor &&
            item.tracking_code_vendor.tracking_code_vendor_locales &&
            item.tracking_code_vendor.tracking_code_vendor_locales.length > 0
        ) {
            return item.tracking_code_vendor.tracking_code_vendor_locales[0]
                .description;
        }
        // return N/A if nothing is there
        return "N/A";
    }

    // formatting the date
    function formatDate(timestamp) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(timestamp).toLocaleDateString(undefined, options);
    }

    // formatting the time
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        const formattedHours = String(hours12).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    // takes you to the webpage to pay your taxes (specifically brazil)
    function handleButtonClick() {
        window.open(
            "https://apps.correios.com.br/cas/login?service=https%3A%2F%2Fapps.correios.com.br%2Fportalimportador%2Fpages%2FpesquisarRemessaImportador%2FpesquisarRemessaImportador.jsf",
            "_blank"
        );
    }

    console.log(showButton)

    return (
        <Paper
            className="trackingStatus"
            elevation={4}
            square={false}
            fullWidth={true}
            style={{
                marginTop: "3rem",
                padding: "1rem",
            }}
        >
            <Container
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "1rem 0",
                }}
            >
                <Button variant="outlined">
                    {status.label.tracking_number} <AssignmentOutlinedIcon />
                </Button>
                <Button variant="outlined">
                    {status.label.external_tracking_number}{" "}
                    <AssignmentOutlinedIcon />
                </Button>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="MuiStack-root css-9jay18">
                        {/* map to track the status of the package */}
                        {status && status.parcel_tracking_items ? (
                            status.parcel_tracking_items.map(
                                (item, index, array) => (
                                    <Timeline key={item.id}>
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography variant="body1">
                                                    {item.timestamp
                                                        ? formatDate(item.timestamp)
                                                        : "N/A"}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {item.timestamp
                                                        ? formatTime(item.timestamp)
                                                        : "N/A"}
                                                </Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                {/* ternary to check the status of the item, if its delivered it shows the green check icon */}
                                                {getDescription(item) ===
                                                "Delivered" ? (
                                                    <CheckCircleOutlineIcon color="success" />
                                                ) : 
                                                // if its the last item in the array it will show that it started here and the shipping logo shows
                                                (
                                                    <TimelineDot>
                                                        {index ===
                                                        array.length - 1 ? (
                                                            <LocalShippingIcon />
                                                        ) : null}
                                                    </TimelineDot>
                                                )}
                                                {/* normal dot with connector */}
                                                {index < array.length - 1 && (
                                                    <TimelineConnector />
                                                )}
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="h6">
                                                    {getDescription(item)}
                                                </Typography>

                                                <Typography variant="overline">
                                                    {/* ternary to check if its in the US or outside the country and display the correct country or city, State, Country */}
                                                    {item.location
                                                        ? item.location
                                                        : item.city && item.state
                                                        ? `${item.city}, ${item.state} ${item.country.isoCode}`
                                                        : "N/A"}
                                                </Typography>
                                                {/* ternary to show the button to "pay your taxes" if it equals "Awaiting payment"*/}
                                                {getDescription(item) ===
                                                    "Awaiting payment" && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleButtonClick}>
                                                        <LinkIcon />  Go to Pay
                                                        Taxes
                                                    </Button>
                                                )}
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                )
                            )
                        ) : (
                            <p> </p>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default TrackingStatus;
