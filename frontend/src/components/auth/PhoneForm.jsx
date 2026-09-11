import { useState } from "react";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { auth } from "../../config/firebase";

const PhoneForm = ({ onOtpSent }) => {
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",

        callback: () => {
          console.log("reCAPTCHA verified");
        },

        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        },
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");

      return;
    }

    try {
      setLoading(true);

      setupRecaptcha();

      const formattedPhone = `+91${cleanPhone}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier,
      );

      console.log("OTP sent successfully");

      onOtpSent({
        phone: cleanPhone,
        confirmationResult,
      });
    } catch (error) {
      console.error("OTP sending failed:", error);

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
      <div className="icon-circle phone-icon">
        <span>☎</span>
      </div>

      <div className="heading">
        <h1>Welcome</h1>

        <p>Enter your mobile number to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Mobile number</label>

        <div className="phone-input">
          <div className="country-code">
            <span>+91</span>
          </div>

          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Enter mobile number"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              setPhone(value);

              setError("");
            }}
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

      <div className="terms">
        By continuing, you agree to our
        <br />
        Terms of Service and Privacy Policy.
      </div>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneForm;
