import express from 'express';



import { createProduct, getAllProducts, getProduct } from "./controller.js";

const router = express.Router();

// Admin Routes 
router.post("/", createProduct);


// Common Routes
router.get("/", getAllProducts)
router.get("/:id", getProduct)


export default router;