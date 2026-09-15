import apiClient from "./apiClient";

const getProducts = async () => {
  return apiClient("/products", {
    method: "GET",
  });
};

const getProduct = async (id) => {
  return apiClient(`/products/${id}`, {
    method: "GET",
  });
};

const createProduct = async (productData) => {
  return apiClient("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

const updateProduct = async (id, productData) => {
  return apiClient(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(productData),
  });
};

const deleteProduct = async (id) => {
  return apiClient(`/products/${id}`, {
    method: "DELETE",
  });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
