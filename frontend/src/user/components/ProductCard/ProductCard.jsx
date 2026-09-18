import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isAvailable = product.status === "available";

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrapper">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">🐟</div>
        )}

        {!isAvailable && <span className="stock-badge">Out of Stock</span>}
      </Link>

      <div className="product-content">
        <div className="product-category">
          {product.category || "Fresh Seafood"}
        </div>

        <Link to={`/products/${product._id}`} className="product-name">
          {product.name}
        </Link>

        <p className="product-description">
          {product.description || "Fresh quality seafood."}
        </p>

        <div className="product-bottom">
          <div className="product-price">
            ₹{product.price}
            <span>/{product.unit}</span>
          </div>

          {isAvailable ? (
            <button className="add-button">+ Add</button>
          ) : (
            <button className="prebook-button">Pre-book</button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
