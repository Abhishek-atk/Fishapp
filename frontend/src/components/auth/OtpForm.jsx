import { useState } from "react";
import { loginWithFirebase } from "../../api/authApi";

function OtpForm({ phone, confirmationResult, onBack, onLoginSuccess }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      // Verify OTP with Firebase
      const result = await confirmationResult.confirm(enteredOtp);

      // Firebase authenticated user
      const firebaseUser = result.user;

      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // Send Firebase token to our backend
      const response = await loginWithFirebase(idToken);

      console.log("Backend login:", response);

      // Tell parent authentication is complete
      onLoginSuccess(response.user);
    } catch (error) {
      console.error(error);

      setError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-content page-enter">
      <div className="icon-circle otp-icon">
        <span>✦</span>
      </div>

      <div className="heading">
        <h1>Verify your number</h1>

        <p>We sent a 6-digit code to</p>

        <strong>+91 {phone}</strong>
      </div>

      <form onSubmit={handleVerify}>
        <label>Enter OTP</label>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              className={`otp-input ${digit ? "filled" : ""}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? (
            <span className="button-loader"></span>
          ) : (
            <>
              Verify & Continue
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <div className="otp-actions">
        <p>
          Didn't receive the code?
          <button type="button">Resend OTP</button>
        </p>

        <button className="change-number" type="button" onClick={onBack}>
          ← Use a different number
        </button>
      </div>
    </div>
  );
}

export default OtpForm;
