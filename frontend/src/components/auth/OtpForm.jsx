
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginWithFirebase } from "../../api/authApi";

const OtpForm = ({
  phone,
  confirmationResult,
  onBack,
}) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleOtpChange = (
    value,
    index
  ) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    setError("");

    if (
      value &&
      index < 5
    ) {
      document
        .getElementById(
          `otp-${index + 1}`
        )
        ?.focus();
    }
  };

  const handleKeyDown = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document
        .getElementById(
          `otp-${index - 1}`
        )
        ?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pasted) {
      return;
    }

    const newOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pasted
      .split("")
      .forEach(
        (digit, index) => {
          newOtp[index] = digit;
        }
      );

    setOtp(newOtp);

    const focusIndex =
      Math.min(
        pasted.length,
        5
      );

    document
      .getElementById(
        `otp-${focusIndex}`
      )
      ?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");

    const enteredOtp =
      otp.join("");

    if (enteredOtp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP."
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        "Verifying OTP..."
      );

      // 1. Verify OTP with Firebase
      const result =
        await confirmationResult.confirm(
          enteredOtp
        );

      const firebaseUser =
        result.user;

      console.log(
        "Firebase login successful:",
        firebaseUser.uid
      );

      // 2. Get Firebase token
      const idToken =
        await firebaseUser.getIdToken(
          true
        );

      console.log(
        "Firebase token received"
      );

      // 3. Login to our backend
      const response =
        await loginWithFirebase(
          idToken
        );

      console.log(
        "Backend login successful:",
        response
      );

      // 4. IMPORTANT
      // Firebase authentication is now complete.
      // AuthContext will detect the Firebase user.
      // Redirect to home.
if (response.user.role === "admin") {
  navigate("/dashboard", {
    replace: true,
  });
} else {
  navigate("/", {
    replace: true,
  });
}

    } catch (error) {
      console.error(
        "OTP verification failed:",
        error
      );

      if (
        error.code ===
        "auth/invalid-verification-code"
      ) {
        setError(
          "Incorrect OTP. Please check the code and try again."
        );
      } else if (
        error.code ===
        "auth/code-expired"
      ) {
        setError(
          "This OTP has expired. Please request a new one."
        );
      } else {
        setError(
          error.message ||
            "Unable to verify OTP."
        );
      }
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
        <h1>
          Verify your number
        </h1>

        <p>
          We sent a 6-digit code to
        </p>

        <strong>
          +91 {phone}
        </strong>
      </div>

      <form
        onSubmit={handleVerify}
      >
        <label>
          Enter OTP
        </label>

        <div className="otp-container">
          {otp.map(
            (digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                className={`otp-input ${
                  digit
                    ? "filled"
                    : ""
                }`}
                type="text"
                inputMode="numeric"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    index
                  )
                }
                onPaste={handlePaste}
              />
            )
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
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

          <button
            type="button"
            disabled={loading}
          >
            Resend OTP
          </button>
        </p>

        <button
          className="change-number"
          type="button"
          disabled={loading}
          onClick={onBack}
        >
          ← Use a different number
        </button>

      </div>

    </div>
  );
};

export default OtpForm;

