
import { useState } from "react";

import PhoneForm from "../components/auth/PhoneForm";
import OtpForm from "../components/auth/OtpForm";

const AuthPage = () => {
  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");

  const [
    confirmationResult,
    setConfirmationResult,
  ] = useState(null);

  const handleOtpSent = ({
    phone,
    confirmationResult,
  }) => {
    setPhone(phone);

    setConfirmationResult(
      confirmationResult
    );

    setStep("otp");
  };

  const handleBack = () => {
    setStep("phone");

    setConfirmationResult(null);
  };

  return (
    <div className="auth-page">

      <div className="background-shape shape-one"></div>

      <div className="background-shape shape-two"></div>

      <div className="background-shape shape-three"></div>

      <div className="auth-card">

        <div className="brand">
          <div className="brand-icon">
            F
          </div>

        </div>

        {step === "phone" && (
          <PhoneForm
            onOtpSent={handleOtpSent}
          />
        )}

        {step === "otp" &&
          confirmationResult && (
            <OtpForm
              phone={phone}
              confirmationResult={
                confirmationResult
              }
              onBack={handleBack}
            />
          )}

        <div className="secure-note">
          <span>●</span>
          Secure authentication
        </div>

      </div>
    </div>
  );
};

export default AuthPage;

