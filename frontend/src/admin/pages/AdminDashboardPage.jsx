import { useAuth } from "../../context/AuthContext";

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-page">
      <div className="home-card page-enter">
        <div className="home-logo">F</div>

        <h1>Admin Dashboard</h1>

        <p className="home-subtitle">Welcome, {user?.phone}</p>

        <div className="user-info">
          <div>
            <span>Account</span>

            <strong>{user?.phone}</strong>
          </div>

          <div>
            <span>Role</span>

            <strong>{user?.role}</strong>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
