import "./Tracking.scss"
import TrackingCard from "../../Components/TrackingCard/TrackingCard";
import TrackingStatus from "../../Components/TrackingStatus/TrackingStatus";
import { useState } from 'react';



function Tracking(){
    const [status, setStatus] = useState(null);

    // receiving the information from Tracking card and passing the information to the children
    const handleStatusUpdate = (newStatus) => {
        // updating status
        setStatus(newStatus);
    }
    

    return (
        <div className="tracking">
            <TrackingCard onStatusUpdate={handleStatusUpdate}/>
            <TrackingStatus status={status}/>
        
        </div>
    )
}
export default Tracking;