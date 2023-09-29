import "./LoginCard.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import axios from "axios";

function LoginCard() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        // checking if there is a password or login if no password or login we wouldnt move forward and show the error
        if (!login || !password) {
            setError(true);
        } else {
            setError(false);
            // if everything we have a login and password then the API will accept the post and produce a JWT Token
            try {
                const response = await axios.post(
                    "https://bringer-air-cargo-server.onrender.com/generate_token",
                    { login, password }
                );
                // storing the token
                const { token } = response.data;
                // setting the token to be displayed
                setToken(token);
            } catch (error) {
                console.error("Error generating token:", error);
            }
        }
    };

    return (
        <Container>
            <Paper elevation={1} square className="loginCard">
                <div className="loginCard_contatiner">
                    <Typography variant="h4" className="loginCard_header">
                        Login
                    </Typography>
                    <form className="loginCard_form" onSubmit={handleSubmit}>
                        <TextField
                            label="Username / Email"
                            name="username"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="loginCard_form-input"
                            error={error && (!login || !password)}
                            helperText={
                                error && (!login || !password) ? "Required" : ""
                            }
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="loginCard_form-input"
                            error={error && (!login || !password)}
                            helperText={
                                error && (!login || !password) ? "Required" : ""
                            }
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            type="submit"
                            className="loginCard_form-button"
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </Button>
                    </form>
                    <Grid className="loginCard_recovery">
                        <Link href="#" className="loginCard_recovery">
                            Recovery password
                        </Link>
                    </Grid>
                </div>
                <Container className="loginCard_container-token">
                    {/* ternary to check if there is a token to then display it  */}
                    {token && (
                        <div>
                            <h3>JWT TOKEN:</h3>
                            <p>{token}</p>
                        </div>
                    )}
                </Container>
            </Paper>
        </Container>
    );
}
export default LoginCard;
