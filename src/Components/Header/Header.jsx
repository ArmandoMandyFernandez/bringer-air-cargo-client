import "./Header.scss";
import logo from "../../Assets/bps-white-logo.png";
import { Link } from "react-router-dom";
import {
    Button
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function Header() {
    return (
        <nav className="header">
            <div className="header_container-links">
                <Link to="/"><img src={logo} alt="Logo Goes Here" className="header_logo" /></Link>
                <ul className="header_links">
                    <li className="header_links-line">Start Shipping</li>
                    <li className="header_links-line">Tracking</li>
                    <li className="header_links-line">API</li>
                    <li className="header_links-line">Contact Us</li>
                </ul>
            </div>
            <div className="header_container-button">
                <Button variant="text" className='header_button'startIcon={<LoginIcon className='header_button-icon'/>}><Link to="/login" className="header_button-link">Sign in</Link></Button>
            </div>

        </nav>
    );
}
export default Header;
