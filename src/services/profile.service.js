import api from './api';

const profileService = {
    // Get User Profile (Unified for Wholesaler/Distributor)
    getWholesalerProfile: async () => {
        const response = await api.get('/v1/auth/users/profile');
        return response.data;
    },

    // Update Wholesaler Profile
    updateWholesalerProfile: async (data, section) => {
        // Assuming PATCH on the same endpoint for updates
        const response = await api.patch('/v1/auth/users/profile', data);
        return response.data;
    },

    // Get Distributor Profile
    getDistributorProfile: async () => {
        const response = await api.get('/v1/auth/users/profile');
        return response.data;
    },

    // Update Distributor Profile
    updateDistributorProfile: async (data, section) => {
        const response = await api.patch('/v1/auth/users/profile', data);
        return response.data;
    }
};

export default profileService;
