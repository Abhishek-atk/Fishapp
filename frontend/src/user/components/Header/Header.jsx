import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="brand">
          <div className="brand-icon">🐟</div>

          <div>
            <div className="brand-name">FreshFish</div>
            <div className="brand-tagline">Fresh from the sea</div>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="header-search">
          <span className="search-icon">⌕</span>

          <input type="text" placeholder="Search fish, prawns, squid..." />

          <button>Search</button>
        </div>

        {/* Desktop Actions */}
        <div className="header-actions">
          <Link to="/profile" className="header-action">
            <span className="action-icon">◯</span>

            <div>
              <small>Hello</small>
              <strong>Account</strong>
            </div>
          </Link>

          <Link to="/cart" className="cart-action">
            <span className="cart-icon">🛒</span>

            <span className="cart-text">Cart</span>

            <span className="cart-count">0</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <input type="text" placeholder="Search products..." />

            <button>Search</button>
          </div>

          <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
            My Account
          </Link>

          <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
            Cart
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="main-navigation">
        <div className="navigation-container">
          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/products">All Fish</Link>

          <Link to="/products?category=fish">Fish</Link>

          <Link to="/products?category=prawns">Prawns</Link>

          <Link to="/products?category=shellfish">Shellfish</Link>

          <Link to="/products?category=cleaned">Cleaned Fish</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
