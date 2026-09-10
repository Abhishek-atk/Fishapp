import { useState } from "react";

import PhoneForm from "../components/auth/PhoneForm";
import OtpForm from "../components/auth/OtpForm";

function AuthPage() {
  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");

  const [confirmationResult, setConfirmationResult] = useState(null);

  const [user, setUser] = useState(null);

  const handleOtpSent = ({ phone, confirmationResult }) => {
    setPhone(phone);
    setConfirmationResult(confirmationResult);
    setStep("otp");
  };

  const handleBack = () => {
    setStep("phone");
    setConfirmationResult(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  if (user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="brand">
            <div className="brand-icon">F</div>

            <span>FishApp</span>
          </div>

          <div className="auth-content page-enter">
            <div className="heading">
              <h1>Welcome</h1>

              <p>You are successfully logged in.</p>

              <strong>{user.phone}</strong>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>
      <div className="background-shape shape-three"></div>

      <section className="auth-card">
        <div className="brand">
          <div className="brand-icon">F</div>

          <span>FishApp</span>
        </div>

        {step === "phone" && <PhoneForm onOtpSent={handleOtpSent} />}

        {step === "otp" && confirmationResult && (
          <OtpForm
            phone={phone}
            confirmationResult={confirmationResult}
            onBack={handleBack}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </section>

      <div className="secure-note">
        <span>●</span>
        Secure authentication
      </div>
    </main>
  );
}

export default AuthPage;
