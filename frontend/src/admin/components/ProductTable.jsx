import { useNavigate } from "react-router-dom";

const ProductTable = ({ products, onDelete }) => {
    const navigate = useNavigate();;
  if (products.length === 0) {
    return (
      <div className="table-state">
        <div className="state-icon blue">◇</div>

        <h3>No products found</h3>

        <p>Start building your catalogue by adding your first fish.</p>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/dashboard/products/new")}
        >
          <span>+</span>
          Add product
        </button>
      </div>
    );
  }

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Visibility</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="product-cell">
                  <div className="product-image-placeholder">
                              <img src={product.image?.url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover",borderRadius: "4px" }} />
                  </div>

                  <div className="product-details">
                    <strong>{product.name}</strong>

                    <span>{product.description || "No description added"}</span>
                  </div>
                </div>
              </td>

              <td>
                <strong className="product-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </strong>
              </td>

              <td>
                <span className="unit-badge">{product.unit}</span>
              </td>

              <td>
                <span
                  className={`status-badge ${
                    product.status === "available" ? "available" : "out"
                  }`}
                >
                  <span></span>

                  {product.status === "available"
                    ? "Available"
                    : "Out of stock"}
                </span>
              </td>

              <td>
                <span
                  className={`visibility-badge ${
                    product.isActive ? "active" : "inactive"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <div className="product-actions">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/dashboard/products/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete"
                    onClick={() => onDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
