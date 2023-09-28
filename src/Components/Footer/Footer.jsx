import "./Footer.scss";
import logo from "../../Assets/bps-white-logo.png";
import bacLogo from "../../Assets/BAC-Logo-WHITE.png"
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer_container">
                <div className="footer_container-logo">
                    <img src={logo} alt="" className="footer_logo" />
                </div>
                <div className="footer_container-information">
                    <div className="footer_container-section">
                        <p className="footer_section-header">
                            Bringer Parcel Services
                        </p>
                        <p className="footer_section-item">1-888-327-4643</p>
                        <p className="footer_section-item">305-592-5427</p>
                        <p className="footer_section-item">bps@bringer.com</p>
                    </div>
                    <div className="footer_container-section">
                        <p className="footer_section-header">Company</p>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/about-us"
                        >
                            About Us
                        </Link>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/privacy"
                        >
                            Privacy
                        </Link>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/terms"
                        >
                            Terms
                        </Link>
                    </div>
                    <div className="footer_container-section">
                        <p className="footer_section-header">Shipping</p>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/prohibited"
                        >
                            Prohibited Items
                        </Link>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/perfumes"
                        >
                            Perfumes
                        </Link>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/lithium-batteries"
                        >
                            Lithium Batteries
                        </Link>
                    </div>
                    <div className="footer_container-section">
                        <p className="footer_section-header">Help</p>
                        <Link className="footer_section-item" to="/login">
                            Start Shipping
                        </Link>
                        <Link className="footer_section-item" to="/tracking">
                            Tracking
                        </Link>
                        <Link
                            className="footer_section-item"
                            to="https://bringerparcel.dev/claims"
                        >
                            Claims
                        </Link>
                    </div>
                </div>
                <div className="footer_container-socials">
                    <div>
                        <Link to="#" ><FacebookIcon fontSize="large" style={{color: "white", margin: "1rem 1rem 1rem 0"}} /></Link>
                        <Link to="#" ><TwitterIcon fontSize="large" style={{color: "white", margin: "1rem 1rem 1rem 0"}} /></Link>
                        <Link to="#" ><InstagramIcon fontSize="large" style={{color: "white", margin: "1rem 1rem 1rem 0"}} /></Link>
                        <Link to="#" ><YouTubeIcon fontSize="large" style={{color: "white", margin: "1rem 1rem 1rem 0"}} /></Link>

                    </div>
                    <div>
                        <p className="footer_logo-description">BPS is a division of</p>
                        <img src={bacLogo} alt="" className="footer_logo"/>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
