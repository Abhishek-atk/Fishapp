import {
  handleCreateProduct,
  handleGetAllProducts,
  getProductById,
} from "./service.js";

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await handleCreateProduct(productData);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct,
        })

    } catch (error) {
        console.error("Login controller error:", error.message);

        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await handleGetAllProducts();
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: allProducts,
        })
    } catch (error) {
        console.error("Get all products controller error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await getProductById(productId);
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product: product,
        })
        
    } catch (error) {
        console.error("Get product controller error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export { createProduct, getAllProducts, getProduct };