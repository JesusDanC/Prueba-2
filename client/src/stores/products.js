import { defineStore } from 'pinia';
import { apiProduct } from '../services/products';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    product: null
  }),
  getters: {
    allProducts: state => state.products,
    getProduct: state => state.product
  },
  actions: {
    async fetchProducts() {
      const response = await apiProduct.getProducts();
      this.products = response.data;
    },
    async fetchProduct(id) {
      const response = await apiProduct.getProduct(id);
      this.product = response.data;
    },
    async createProduct(product) {
      const response = await apiProduct.createProduct(product);
      this.products.push(response.data);
    },
    async updateProduct(id, product) {
      const response = await apiProduct.updateProduct(id, product);
      const index = this.products.findIndex(u => u.id === id);
      if (index !== -1) {
        this.products.splice(index, 1, response.data);
      }
    },
    async deleteProduct(id) {
      await apiProduct.deleteProduct(id);
      this.products = this.products.filter(product => product.id !== id);
    }
  }
});
