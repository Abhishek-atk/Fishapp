/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts, deleteProduct } from "../../api/productApi";
import ProductTable from "../components/ProductTable";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null,
    productName: "",
  });

  const [deleting, setDeleting] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      console.log("Fetched products:", data);

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setError(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (productId) => {
    const product = products.find((product) => product._id === productId);

    setDeleteModal({
      open: true,
      productId: productId,
      productName: product?.name || "this product",
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.productId) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteProduct(deleteModal.productId);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== deleteModal.productId,
        ),
      );

      setDeleteModal({
        open: false,
        productId: null,
        productName: "",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message || "Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (deleting) {
      return;
    }

    setDeleteModal({
      open: false,
      productId: null,
      productName: "",
    });
  };

  return (
    <div className="admin-page">
      {/* Add Product */}

      <section className="quick-actions-card">
        <div>
          <span className="eyebrow">PRODUCTS</span>

          <h2>Manage your products</h2>

          <p>Add, update and manage the fish products in your catalogue.</p>
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
        </div>
      </section>

      {/* Product List */}

      <section className="products-list-section">
        <div className="products-list-header"></div>

        {loading && (
          <div className="table-state">
            <p>Loading products...</p>
          </div>
        )}

        {!loading && error && (
          <div className="table-state">
            <h3>Unable to load products</h3>

            <p>{error}</p>

            <button
              type="button"
              className="primary-button"
              onClick={loadProducts}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <ProductTable products={products} onDelete={handleDelete} />
        )}
      </section>

      {/* Delete Confirmation Modal */}

      {deleteModal.open && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon">!</div>

            <div className="delete-modal-content">
              <h3>Delete product?</h3>

              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteModal.productName}</strong>? This action cannot
                be undone.
              </p>
            </div>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="delete-confirm-button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
