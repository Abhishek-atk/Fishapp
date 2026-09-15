import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProduct, updateProduct } from "../../api/productApi";

import EditProductForm from "../components/EditProductForm";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(id);

        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error loading product:", error);

        setError(error.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setError("");

      await updateProduct(id, formData);

      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);

      throw new Error(error.message || "Failed to update product.", {
        cause: error,
      });
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="table-state">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="table-state">
          <h3>Unable to load product</h3>
          <p>{error}</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/dashboard/products")}
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="admin-page">
        <div className="table-state">
          <h3>Product not found</h3>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/dashboard/products")}
          >
            Back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="quick-actions-card">
        <div>
          <span className="eyebrow">PRODUCTS</span>

          <h2>Edit product</h2>

          <p>Update the details of {product.name}.</p>
        </div>
      </section>

      <EditProductForm initialData={product} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditProductPage;
