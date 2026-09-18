const categories = [
  {
    id: 1,
    name: "All Fish",
    icon: "🐟",
  },
  {
    id: 2,
    name: "Sea Fish",
    icon: "🐠",
  },
  {
    id: 3,
    name: "Prawns",
    icon: "🦐",
  },
  {
    id: 4,
    name: "Squid",
    icon: "🦑",
  },
  {
    id: 5,
    name: "Shellfish",
    icon: "🦪",
  },
  {
    id: 6,
    name: "Cleaned Fish",
    icon: "🐟",
  },
];

const CategoryNav = () => {
  return (
    <section className="category-section">
      <div className="section-container">
        <div className="section-heading">
          <div>
            <span>SHOP BY</span>
            <h2>Categories</h2>
          </div>

          <button className="view-all-button">View all →</button>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <button key={category.id} className="category-card">
              <div className="category-icon">{category.icon}</div>

              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
