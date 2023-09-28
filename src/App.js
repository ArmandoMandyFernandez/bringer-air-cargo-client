import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Tracking from "./Pages/Tracking/Tracking";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
    return (
        <>
            <Header />
            <div className="all">
                <Routes>
                    <Route path="/" element={<Tracking />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer/>
            </div>
        </>
    );
}

export default App;
