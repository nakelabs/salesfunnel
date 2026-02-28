import api from './api';

const profileService = {
    // GET /v1/auth/users/profile — Get User Profile
    getProfile: async () => {
        const response = await api.get('/v1/auth/users/profile');
        return response.data;
    },

    // PATCH /v1/auth/users/profile — Update User Profile
    updateProfile: async (data) => {
        const response = await api.put('/v1/auth/users/profile', data);
        return response.data;
    },

    // Aliases for backward compatibility
    getWholesalerProfile: async () => {
        const response = await api.get('/v1/auth/users/profile');
        return response.data;
    },

    updateWholesalerProfile: async (data) => {
        const response = await api.put('/v1/auth/users/profile', data);
        return response.data;
    },

    getDistributorProfile: async () => {
        const response = await api.get('/v1/auth/users/profile');
        return response.data;
    },

    updateDistributorProfile: async (data) => {
        const response = await api.put('/v1/auth/users/profile', data);
        return response.data;
    },
};

export default profileService;
