import api from '../lib/axios';

export const apiProducts = {
    getproducts() {
      return api.get(`/products`);
    },
    getProduct(productId) {
      return api.get(`/products/${productId}`);
    },
    createProduct(product) {
      return api.post(`/products`, product);
    },
    updateProduct(productId, product) {
      return api.put(`/products/${productId}`, product);
    },
    deleteProduct(productId) {
      return api.delete(`/products/${productId}`);
    }
  };