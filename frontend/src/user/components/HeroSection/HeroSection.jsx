const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">FRESH • CLEAN • DELIVERED</span>

          <h1>
            Fresh seafood,
            <br />
            delivered to your door.
          </h1>

          <p>
            Quality fish and seafood sourced fresh and delivered conveniently to
            your home.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">Shop Fresh Fish</button>

            <button className="secondary-button">Explore Categories</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">🐟</div>

          <div className="floating-card floating-card-one">
            <span>✓</span>
            <div>
              <strong>Fresh Stock</strong>
              <small>Updated daily</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>⚡</span>
            <div>
              <strong>Quick Delivery</strong>
              <small>To your doorstep</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
