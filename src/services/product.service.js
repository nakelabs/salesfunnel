import api from './api';

const productService = {
    // Get all products with optional filters
    getAll: async (params = {}) => {
        const response = await api.get('/v1/products', { params });
        return response.data;
    },

    // Get single product by ID
    getById: async (id) => {
        const response = await api.get(`/v1/products/${id}`);
        return response.data;
    },

    // Get categories
    getCategories: async () => {
        const response = await api.get('/v1/products/categories');
        return response.data;
    },

    // Check stock availability (for orders)
    checkStock: async (items) => {
        const response = await api.post('/v1/products/check-stock', { items });
        return response.data;
    }
};

export default productService;
