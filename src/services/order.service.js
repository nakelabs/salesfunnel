import api from './api';

const orderService = {
    // Get orders for current user
    getMyOrders: async (params = {}) => {
        const response = await api.get('/orders', { params });
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
    }
};

export default orderService;
