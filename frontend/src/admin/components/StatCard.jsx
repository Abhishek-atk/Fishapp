const StatCard = ({ title, value, description, icon, accent = "blue" }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className={`stat-icon ${accent}`}>{icon}</div>

        <button
          type="button"
          className="stat-more"
          aria-label={`${title} options`}
        >
          •••
        </button>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-title">{title}</div>

      <div className="stat-description">{description}</div>
    </div>
  );
};

export default StatCard;
