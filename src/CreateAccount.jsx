import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// A simple component for styling the background
const PageBackground = ({ children }) => (
    <div style={{
        background: "linear-gradient(to right, #89f7fe, #66a6ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    }}>
        {children}
    </div>
);

function CreateAccount() {
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState(""); // State for displaying error messages

    // Clear error message when user starts typing
    const handlePhoneChange = (e) => {
        setError("");
        setPhoneNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setError("");
        setOtp(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setError("");
        setPassword(e.target.value);
    };

    // Handle OTP send with phone number validation
    const handleSendOtp = () => {
        // Simple validation for a 10-digit number
        if (phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber)) {
            setIsOtpSent(true);
            setError(""); // Clear previous errors
            // In a real app, you would call an API here to send the OTP
            console.log("OTP Sent to", phoneNumber);
        } else {
            setError("Please enter a valid 10-digit phone number.");
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = () => {
        // Using a hardcoded OTP for simulation
        if (otp === "0000") {
            alert("OTP verified successfully!");
            setOtpVerified(true);
            setError("");
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    // Handle account creation with password validation
    const handleCreateAccount = (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (otpVerified && password) {
            alert("Account created successfully!");
            // In a real app, you'd send the data to your backend here
            navigate("/"); // Navigate to the login or home page
        } else {
            // This case should ideally not be hit due to the UI flow
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <PageBackground>
            <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", border: "none", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#0056b3" }}>Create Your Account</h2>
                
                {/* Form submission is handled by the final button */}
                <form onSubmit={handleCreateAccount}>
                    {/* Step 1: Phone Number Input */}
                    {!isOtpSent && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter your 10-digit phone number"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        </>
                    )}

                    {/* Step 2: OTP Verification */}
                    {isOtpSent && !otpVerified && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <input
                                    id="otp"
                                    type="text"
                                    className="form-control"
                                    placeholder="4-digit code"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-success w-100"
                                onClick={handleVerifyOtp}
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

                    {/* Step 3: Password Creation */}
                    {otpVerified && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="password">Create Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Must be at least 8 characters"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Create Account</button>
                            </div>
                        </>
                    )}

                    {/* Display Error Messages */}
                    {error && (
                        <div className="alert alert-danger mt-3 text-center" role="alert">
                            {error}
                        </div>
                    )}
                </form>

                <div className="mt-3 text-center">
                    <button className="btn btn-link" onClick={() => navigate("/Login")}>
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </PageBackground>
    );
}

export default CreateAccount;