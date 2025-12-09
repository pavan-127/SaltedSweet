import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Reusable background component for consistent styling
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

function ForgotPassword() {
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP & New Password, 3: Success

    // Step 1: Handle sending the reset code
    const handleSendResetCode = (e) => {
        e.preventDefault();
        setError("");

        if (phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber)) {
            // In a real app, you would call an API to send an OTP to the phone number.
            console.log("Sending OTP to:", phoneNumber);
            setStep(2); // Move to the next step
        } else {
            setError("Please enter a valid 10-digit phone number.");
        }
    };

    // Step 2: Handle the final password reset
    const handleResetPassword = (e) => {
        e.preventDefault();
        setError("");

        // --- Validation ---
        if (otp !== "0000") { // Using a hardcoded OTP for simulation
            setError("The OTP code is incorrect.");
            return;
        }
        if (newPassword.length < 8) {
            setError("Your new password must be at least 8 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("The passwords do not match.");
            return;
        }

        // --- If all checks pass ---
        // In a real app, you would send the phone number, OTP, and new password to your backend.
        console.log("Password for", phoneNumber, "has been successfully reset.");
        setStep(3); // Move to the success step
    };

    const renderStep = () => {
        switch (step) {
            // --- STEP 1: ENTER PHONE NUMBER ---
            case 1:
                return (
                    <form onSubmit={handleSendResetCode}>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                className="form-control"
                                placeholder="Enter your registered phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Reset Code</button>
                    </form>
                );
            
            // --- STEP 2: VERIFY OTP AND CREATE NEW PASSWORD ---
            case 2:
                return (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">Reset Code (OTP)</label>
                            <input
                                id="otp"
                                type="text"
                                className="form-control"
                                placeholder="Enter the 4-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                className="form-control"
                                placeholder="At least 8 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-control"
                                placeholder="Repeat your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Reset Password</button>
                    </form>
                );
            
            // --- STEP 3: SUCCESS MESSAGE ---
            case 3:
                return (
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" className="bi bi-check-circle-fill mb-3" viewBox="0 0 16 16">
                           <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <h4 className="mb-3">Password Reset Successfully!</h4>
                        <p>You can now log in with your new password.</p>
                        <button onClick={() => navigate('/login')} className="btn btn-primary w-100">Back to Login</button>
                    </div>
                );

            default:
                return null;
        }
    };
    
    return (
        <PageBackground>
            <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", border: "none", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 fw-bold" style={{ color: "#0056b3" }}>
                    {step < 3 ? "Reset Your Password" : ""}
                </h2>
                
                {renderStep()}
                
                {/* Display Error Messages */}
                {error && (
                    <div className="alert alert-danger mt-3 text-center" role="alert">
                        {error}
                    </div>
                )}
                
                {step < 3 && (
                    <div className="mt-3 text-center">
                        <button className="btn btn-link" onClick={() => navigate("/login")}>
                            Remembered your password? Login
                        </button>
                    </div>
                )}
            </div>
        </PageBackground>
    );
}

export default ForgotPassword;