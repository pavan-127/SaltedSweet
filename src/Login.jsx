import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const PageBackground = ({ children }) => (
    <div style={{
        background: "linear-gradient(to right, #89f7fe, #66a6ff)",
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px"
    }}>
        {children}
    </div>
);

function Login() {
    const navigate = useNavigate();

    
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        setError(""); 

        // Demo credentials
        if (username === "Pavan" && password === "Pavan") {
            // Set state and persist to localStorage
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            navigate("/");
        } else {
            setError("Invalid username or password. Please try again.");
        }
    };

    // Handle Logout
    const handleLogout = () => {
        // Clear state and remove from localStorage
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setUsername("");
        setPassword("");
        navigate("/"); // Redirect to home after logout
    };

    return (
        <PageBackground>
            <div className="card shadow-lg p-5" style={{ maxWidth: "450px", width: "100%", border: "none", borderRadius: "15px" }}>
                {isLoggedIn ? (
                    // --- LOGGED-IN VIEW ---
                    <div className="text-center">
                        <h3 className="mb-3 fw-bold" style={{ color: "#0056b3" }}>Profile</h3>
                        <img
                            src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff&size=100`}
                            alt="Profile Avatar"
                            className="rounded-circle mb-3 shadow-sm"
                        />
                        <h4>Welcome, {username}!</h4>
                        <p className="text-muted">You are successfully logged in.</p>
                        <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    // --- LOGIN FORM VIEW ---
                    <div>
                        <h2 className="text-center mb-4 fw-bold" style={{ color: "#0056b3" }}>Welcome Back!</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Display error message here instead of an alert */}
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <div className="text-center mt-3">
                            <button className="btn btn-link" onClick={() => navigate('/forgot-password')}>
                               Forgot password?
                                </button>
                                
                            </div>
                        </form>
                        <hr />
                        <div className="text-center">
                            <p className="mb-2">Don't have an account?</p>
                            <button className="btn btn-outline-success w-100" onClick={() => navigate("/create-account")}>
                                Create New Account
                            </button>
                            
                        </div>
                 
          
                    </div>
                )}
                
            </div>
        </PageBackground>
    );
}

export default Login;