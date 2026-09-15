import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  const phone = user?.phone || "Admin";

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <div className="topbar-search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input type="search" placeholder="Search anything..." />

          <span className="search-shortcut">Ctrl K</span>
        </div>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="topbar-icon-button"
          aria-label="Notifications"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span className="notification-dot"></span>
        </button>

        <button type="button" className="topbar-icon-button" aria-label="Help">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-.8.8-1.8 1.2-1.8 2.3" />
            <path d="M12 17h.01" />
          </svg>
        </button>

        <div className="topbar-divider"></div>

        <button type="button" className="admin-profile">
          <div className="profile-avatar">A</div>

          <div className="profile-info">
            <strong>Administrator</strong>
            <span>{phone}</span>
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
