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
  const allProducts = await Products.find();
  return allProducts;
}
const getProductById = async (productId) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }
  const product = await Products.findById(productId);
  return product;
};

export { handleCreateProduct, handleGetAllProducts, getProductById };
