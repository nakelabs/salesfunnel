import api from './api';

const authService = {
    // Login user
    login: async (email, password, userType = 'wholesaler') => {
        // OAuth2PasswordRequestForm expects form-urlencoded data with 'username' and 'password'
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await api.post('/v1/auth/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Login Response:', response.data);
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);

            // Construct user object with ID from response and passed email/type
            const user = {
                id: response.data.user_id,
                email: email,
                userType: userType
            };
            localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
    },

    // Register user
    register: async (userData, userType) => {
        const endpoint = userType === 'wholesaler'
            ? '/v1/auth/register-wholesaler'
            : '/v1/auth/register-distributor';

        // We must unset 'Content-Type' so the browser can automatically set 
        // 'multipart/form-data; boundary=...' which is required for file uploads.
        const response = await api.post(endpoint, userData, {
            headers: {
                'Content-Type': undefined,
            }
        });

        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            // Decode or store user info if needed
        }
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;
