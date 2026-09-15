import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductImageUpload from "./ProductImageUpload";

const EditProductForm = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    unit: initialData.unit || "kg",
    status: initialData.status || "available",
    isActive: initialData.isActive ?? true,
  });

  const [image, setImage] = useState(initialData.image || null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
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
      setSaving(true);

      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        unit: formData.unit,
        status: formData.status,
        isActive: formData.isActive,
        image: image || {
          url: "",
          publicId: "",
        },
      });
    } catch (error) {
      console.error("Update product error:", error);

      setError(error.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section-header">
          <span className="eyebrow">PRODUCT DETAILS</span>

          <h3>Basic information</h3>

          <p>Update the information customers see for this product.</p>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">
              Product name <span>*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="price">
              Price <span>*</span>
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="form-field">
            <label htmlFor="unit">Unit</label>

            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="kg">KG</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>

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

          <div className="form-field full">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
            />
          </div>

          <div className="form-field">
            <label htmlFor="isActive">Visibility</label>

            <select
              id="isActive"
              name="isActive"
              value={formData.isActive ? "active" : "inactive"}
              onChange={(event) => {
                setFormData((currentData) => ({
                  ...currentData,
                  isActive: event.target.value === "active",
                }));
              }}
            >
              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <span className="eyebrow">PRODUCT IMAGE</span>

          <h3>Product image</h3>

          <p>Update the image shown in your product catalogue.</p>
        </div>

        <ProductImageUpload
          initialImage={image}
          onUpload={(uploadedImage) => {
            setImage(uploadedImage);
          }}
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/dashboard/products")}
          disabled={saving}
        >
          Cancel
        </button>

        <button type="submit" className="primary-button" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
