import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Icon = ({ name, size = 19 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    dashboard: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),

    products: (
      <svg {...common}>
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" />
        <path d="M12 21v-9.5" />
        <path d="m4.5 7.7 7.5 4.3 7.5-4.3" />
      </svg>
    ),

    orders: (
      <svg {...common}>
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </svg>
    ),

    customers: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.7-3.5 3-5 7-5s6.3 1.5 7 5" />
      </svg>
    ),

    delivery: (
      <svg {...common}>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    ),

    categories: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),

    settings: (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    ),

    logout: (
      <svg {...common}>
        <path d="M10 4H5v16h5" />
        <path d="M14 8l4 4-4 4" />
        <path d="M18 12H9" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const menuItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: "dashboard",
    end: true,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icon: "products",
  },
  {
    label: "Orders",
    path: "/dashboard/orders",
    icon: "orders",
  },
  {
    label: "Customers",
    path: "/dashboard/customers",
    icon: "customers",
  },
  {
    label: "Delivery",
    path: "/dashboard/delivery-slots",
    icon: "delivery",
  },
];

const managementItems = [
  {
    label: "Categories",
    path: "/dashboard/categories",
    icon: "categories",
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: "settings",
  },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <span>F</span>
        </div>

        <div className="brand-copy">
          <span>Fish Market</span>
        </div>
      </div>

      <div className="sidebar-scroll">
        <nav className="sidebar-nav">
          <p className="sidebar-label">Workspace</p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">
                <Icon name={item.icon} />
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}

          <p className="sidebar-label management-label">Management</p>

          {managementItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">
                <Icon name={item.icon} />
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-shop-card">
          <div className="shop-status-dot"></div>

          <div>
            <strong>Store is live</strong>
            <span>Customers can order</span>
          </div>
        </div>

        <button type="button" className="sidebar-logout" onClick={logout}>
          <Icon name="logout" size={18} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
