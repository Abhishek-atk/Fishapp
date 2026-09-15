import Products from "./model.js";

const handleCreateProduct = async (productData) => {
    const {
      name,
      price,
    } = productData;

   if (!name) {
     throw new Error("Product name is required");
   }

   if (price === undefined || price === null) {
     throw new Error("Product price is required");
   }

   if (price < 0) {
     throw new Error("Product price cannot be negative");
   }

  const newProduct = await Products.create(productData);
  return newProduct;
};

const handleGetAllProducts = async () => {
  const allProducts = await Products.find({ isActive: true });
  return allProducts;
}
const getProductById = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const product = await Products.findOne({
    _id: productId,
    isActive: true,
  });

  return product;
};
const handleDeleteProduct = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const deletedProduct = await Products.findByIdAndUpdate(
    productId,
    { isActive: false },
    { new: true },
  );

  if (!deletedProduct) {
    throw new Error("Product not found");
  }

  return deletedProduct;
};

const handleEditProduct = async (productId, updatedData) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

export { handleCreateProduct, handleGetAllProducts, getProductById, handleDeleteProduct, handleEditProduct };
