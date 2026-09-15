import { useRef, useState } from "react";

import { uploadImage } from "../../api/cloudinaryApi";

const ProductImageUpload = ({ initialImage = null, onUpload }) => {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const uploadedImage = await uploadImage(file);

      setImage(uploadedImage);

      onUpload(uploadedImage);
    } catch (error) {
      console.error("Image upload error:", error);

      setError(error.message || "Unable to upload image.");
    } finally {
      setUploading(false);
    }

    event.target.value = "";
  };

  const handleRemove = () => {
    setImage(null);
    setError("");

    onUpload(null);
  };

  return (
    <div className="product-image-upload">
      <div className="form-field full">
        <label>
          Product image
          <span>*</span>
        </label>

        {!image && !uploading && (
          <div className="image-upload-box">
            <div className="image-upload-icon">+</div>

            <div className="image-upload-content">
              <strong>Upload product image</strong>

              <small>JPG, PNG or WEBP · Maximum 5 MB</small>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={handleSelectImage}
            >
              Choose image
            </button>
          </div>
        )}

        {uploading && (
          <div className="image-upload-box">
            <div className="image-upload-spinner"></div>

            <div className="image-upload-content">
              <strong>Uploading image...</strong>

              <small>Please wait while the image is uploaded.</small>
            </div>
          </div>
        )}

        {image && !uploading && (
          <div className="image-preview-box">
            <div className="image-preview">
              <img src={image.url} alt="Product preview" />
            </div>

            <div className="image-preview-info">
              <strong>Product image</strong>

              <small>Image uploaded successfully.</small>

              <div className="image-preview-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleSelectImage}
                >
                  Replace
                </button>

                <button
                  type="button"
                  className="remove-image-button"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          hidden
        />

        {error && <small className="image-upload-error">{error}</small>}
      </div>
    </div>
  );
};

export default ProductImageUpload;
