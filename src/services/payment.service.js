import api from './api';

const paymentService = {
    // Initialize Payment via Paystack
    initializePayment: async (paymentData) => {
        const response = await api.post('/v1/payment/initialize', paymentData);
        return response.data;
    }
};

export default paymentService;
