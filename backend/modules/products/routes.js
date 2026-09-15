import express from 'express';



import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  editProduct,
} from "./controller.js";

const router = express.Router();

// Admin Routes 
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", editProduct); 


// Common Routes
router.get("/", getAllProducts)
router.get("/:id", getProduct)


export default router;