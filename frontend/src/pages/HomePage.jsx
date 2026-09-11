import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-page">
      <div className="home-card page-enter">
        <div className="home-logo">F</div>

        <h1>Welcome</h1>

        <p className="home-subtitle">You are successfully logged in.</p>

        <div className="user-info">
          <div>
            <span>Phone</span>

            <strong>{user?.phone}</strong>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
