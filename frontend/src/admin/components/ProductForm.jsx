import { useState } from "react";
import ProductImageUpload from "./ProductImageUpload";

const ProductForm = ({
  initialData,
  onSubmit,
  loading,
  submitText = "Create product",
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price ?? "",
    unit: initialData?.unit || "kg",
    status: initialData?.status || "available",
    isActive: initialData?.isActive ?? true,
  });

    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
console.log(image)
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      setError("Please enter a valid product price.");
      return;
    }

    try {
      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        unit: formData.unit,
        status: formData.status,
        isActive: formData.isActive,
        image,
      });
    } catch (error) {
      setError(error.message || "Unable to save product.");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && (
        <div className="form-error">
          <span>!</span>
          {error}
        </div>
      )}

      <section className="form-section">
        <div className="form-section-heading">
          <div className="section-number">01</div>

          <div>
            <h2>Product information</h2>

            <p>Basic information customers will see in your store.</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field full">
            <label htmlFor="name">
              Fish name
              <span>*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Seer Fish"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field full">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Describe the fish, freshness, recommended use, etc."
              value={formData.description}
              onChange={handleChange}
            />

            <small>Keep this short and useful for customers.</small>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <div className="section-number">02</div>

          <div>
            <h2>Pricing & availability</h2>

            <p>Set the current selling price and product status.</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="price">
              Price
              <span>*</span>
            </label>

            <div className="input-with-prefix">
              <span>₹</span>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="650"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="unit">Selling unit</label>

            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="kg">Kilogram (kg)</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="status">Availability</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>

              <option value="out_of_stock">Out of stock</option>
            </select>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-heading">
          <div className="section-number">03</div>

          <div>
            <h2>Store visibility</h2>

            <p>Control whether this product is visible to customers.</p>
          </div>
        </div>

        <label className="toggle-row">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />

          <span className="custom-toggle"></span>

          <span className="toggle-copy">
            <strong>Product is active</strong>

            <small>Customers can see and order this product.</small>
          </span>
        </label>
        <ProductImageUpload
          onUpload={(uploadedImage) => {
            setImage(uploadedImage);
          }}
        />
      </section>

      <div className="form-footer">
        <button
          type="button"
          className="secondary-button"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
