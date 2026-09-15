import {
  handleCreateProduct,
  handleGetAllProducts,
  getProductById,
  handleDeleteProduct,
  handleEditProduct,
} from "./service.js";

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        console.log("Received product data:", productData);
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
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await handleDeleteProduct(productId);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {
        console.error("Delete product controller error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
const editProduct = async (req, res) => { 
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await handleEditProduct(productId, updateData);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Edit product controller error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export { createProduct, getAllProducts, getProduct, deleteProduct, editProduct };