import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";

import { createProduct } from "../../api/productApi";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (productData) => {
    try {
      setLoading(true);

      await createProduct(productData);

      navigate("/dashboard/products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <section className="page-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard/products")}
          >
            ← Products
          </button>

          <span className="eyebrow">CATALOGUE</span>

          <h1>Add product</h1>

          <p>Add a new fish to your online store.</p>
        </div>
      </section>

      <div className="form-card">
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Create product"
        />
      </div>
    </div>
  );
};

export default CreateProductPage;
