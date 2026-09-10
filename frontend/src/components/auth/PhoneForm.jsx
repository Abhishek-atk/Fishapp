import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { auth } from "../../config/firebase";

function PhoneForm({ onOtpSent }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {},
          },
        );
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier,
      );

      onOtpSent({
        phone,
        confirmationResult,
      });
    } catch (error) {
      console.error(error);

      setError(error.message || "Unable to send OTP. Please try again.");

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-content page-enter">
      <div className="icon-circle">
        <span>+91</span>
      </div>

      <div className="heading">
        <h1>Welcome back</h1>
        <p>Enter your mobile number to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Mobile number</label>

        <div className="phone-input">
          <div className="country-code">+91</div>

          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength="10"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            autoFocus
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? (
            <span className="button-loader"></span>
          ) : (
            <>
              Continue
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <p className="terms">
        By continuing, you agree to our <span>Terms</span> and{" "}
        <span>Privacy Policy</span>.
      </p>

      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneForm;
