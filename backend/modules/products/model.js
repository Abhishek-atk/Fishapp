import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["kg"],
      default: "kg",
    },
    status: {
      type: String,
      enum: ["available", "out_of_stock"],
      default: "available",
    },
    image: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Products = mongoose.model("Products", productsSchema);

export default Products;