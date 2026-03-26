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

    updateDistributorProfile: async (profileData, section) => {
        let payload = {};

        if (section === 'personal') {
            payload = {
                full_name: profileData.fullName,
                phone: profileData.phone,
            };
        } else if (section === 'business') {
            payload = {
                distributor_profile: {
                    business_name: profileData.businessName,
                    cac_registration_number: profileData.cacRegistrationNumber,
                    business_address: profileData.businessAddress,
                    business_phone: profileData.businessPhone,
                    business_email: profileData.businessEmail,
                    tin: profileData.tin,
                },
            };
        } else if (section === 'owner') {
            payload = {
                distributor_profile: {
                    owner_full_name: profileData.ownerFullName,
                    owner_phone: profileData.ownerPhone,
                    owner_email: profileData.ownerEmail,
                },
            };
        } else if (section === 'bank') {
            payload = {
                distributor_profile: {
                    bank_name: profileData.bankName,
                    account_name: profileData.accountName,
                    account_number: profileData.accountNumber,
                },
            };
        }

        const response = await api.put('/v1/auth/users/profile', payload);
        return response.data;
    },
};

export default profileService;
