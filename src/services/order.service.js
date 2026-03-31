import api from './api';

const orderService = {
    getMyOrders: async (params = {}) => {
        const response = await api.get('/v1/wholesaler/orders', { params });
        return response.data;
    },

    // Get order details
    getById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Create new order
    create: async (orderData) => {
        const response = await api.post('/v1/wholesaler/orders', orderData);
        return response.data;
    },

    // Get order stats (for dashboard)
    getStats: async () => {
        const response = await api.get('/orders/stats');
        return response.data;
    },

    // Get wholesaler dashboard stats
    getDashboardStats: async () => {
        const response = await api.get('/v1/wholesaler/dashboard');
        return response.data;
    }
};

export default orderService;
