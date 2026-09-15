import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import StatCard from "../components/StatCard";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user", user);

  return (
    <div className="admin-page">
      <section className="dashboard-welcome">
        <div>
          <span className="eyebrow">STORE OVERVIEW</span>

          <h1>Good evening, Admin.</h1>

          <p>Here's what's happening with your fish store today.</p>
        </div>

        
      </section>

      <section className="stats-grid">
        <StatCard
          title="Total products"
          value="0"
          description="Products in your catalogue"
          accent="blue"
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" />
              <path d="M12 21v-9.5" />
              <path d="m4.5 7.7 7.5 4.3 7.5-4.3" />
            </svg>
          }
        />

        <StatCard
          title="Today's orders"
          value="0"
          description="Orders received today"
          accent="teal"
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 3h12v18H6z" />
              <path d="M9 7h6" />
              <path d="M9 11h6" />
              <path d="M9 15h4" />
            </svg>
          }
        />

        <StatCard
          title="Pending orders"
          value="0"
          description="Waiting for confirmation"
          accent="orange"
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l2.5 2" />
            </svg>
          }
        />

        <StatCard
          title="Customers"
          value="0"
          description="Registered customers"
          accent="purple"
          icon={
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M5 20c.7-3.5 3-5 7-5s6.3 1.5 7 5" />
            </svg>
          }
        />
      </section>

      <section className="dashboard-main-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Recent orders</h2>
              <p>Your latest customer orders will appear here.</p>
            </div>

            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/dashboard/orders")}
            >
              View all
            </button>
          </div>

          <div className="dashboard-empty">
            <div className="empty-illustration">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <path d="M9 15h4" />
              </svg>
            </div>

            <h3>No orders yet</h3>

            <p>New customer orders will appear in this section.</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Store health</h2>
              <p>Quick look at your catalogue.</p>
            </div>
          </div>

          <div className="health-list">
            <div className="health-row">
              <div className="health-label">
                <span className="health-dot green"></span>
                <span>Available</span>
              </div>

              <strong>0</strong>
            </div>

            <div className="health-row">
              <div className="health-label">
                <span className="health-dot red"></span>
                <span>Out of stock</span>
              </div>

              <strong>0</strong>
            </div>

            <div className="health-row">
              <div className="health-label">
                <span className="health-dot gray"></span>
                <span>Inactive</span>
              </div>

              <strong>0</strong>
            </div>
          </div>

          <button
            type="button"
            className="health-action"
            onClick={() => navigate("/dashboard/products")}
          >
            Manage products
            <span>→</span>
          </button>
        </div>
      </section>

      <section className="quick-actions-card">
        <div>
          <span className="eyebrow">QUICK ACTIONS</span>

          <h2>Manage your store</h2>

          <p>Common tasks you may need while running the shop.</p>
        </div>

        <div className="quick-actions">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products/new")}
          >
            <span className="quick-action-icon blue">+</span>

            <span>
              <strong>Add product</strong>
              <small>Add a new fish</small>
            </span>
          </button>

          <button type="button" onClick={() => navigate("/dashboard/products")}>
            <span className="quick-action-icon teal">◇</span>

            <span>
              <strong>Manage products</strong>
              <small>Update your catalogue</small>
            </span>
          </button>

          <button type="button" onClick={() => navigate("/dashboard/orders")}>
            <span className="quick-action-icon orange">↗</span>

            <span>
              <strong>View orders</strong>
              <small>Check customer orders</small>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
