import api from './api';

const distributorService = {
    // ─── Product Endpoints ───────────────────────────────────────

    // GET /v1/distributors/{distributor_id}/products — Get Distributor Products
    getDistributorProducts: async (distributorId, params = {}) => {
        const response = await api.get(`/v1/distributors/${distributorId}/products`, { params });
        return response.data;
    },

    // POST /v1/distributors/{distributor_id}/products — Add Product To Distributor Catalog
    addProductToCatalog: async (distributorId, productData) => {
        const response = await api.post(`/v1/distributors/${distributorId}/products`, productData);
        return response.data;
    },

    // PUT /v1/distributors/{distributor_id}/products/{product_id} — Update Distributor Product
    updateDistributorProduct: async (distributorId, productId, productData) => {
        const response = await api.put(`/v1/distributors/${distributorId}/products/${productId}`, productData);
        return response.data;
    },

    // DELETE /v1/distributors/{distributor_id}/products/{product_id} — Delete Distributor Product
    deleteDistributorProduct: async (distributorId, productId) => {
        const response = await api.delete(`/v1/distributors/${distributorId}/products/${productId}`);
        return response.data;
    },

    // ─── Distributor Endpoints ───────────────────────────────────

    // GET /v1/distributors — Get All Distributors
    getAllDistributors: async (params = {}) => {
        const response = await api.get('/v1/distributors', { params });
        return response.data;
    },

    // ─── Order Endpoints ─────────────────────────────────────────

    // GET /v1/distributor/orders/new — Get New Distributor Orders
    getNewOrders: async (params = {}) => {
        const response = await api.get('/v1/distributor/orders/new', { params });
        return response.data;
    },

    // GET /v1/distributor/orders/{order_id} — Get Distributor Order Details
    getOrderDetails: async (orderId) => {
        const response = await api.get(`/v1/distributor/orders/${orderId}`);
        return response.data;
    },

    // PUT /v1/distributor/orders/{order_id}/status — Update Distributor Order Status
    updateOrderStatus: async (orderId, statusData) => {
        const response = await api.put(`/v1/distributor/orders/${orderId}/status`, statusData);
        return response.data;
    },
};

export default distributorService;
