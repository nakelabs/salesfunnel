import api from './api';

const cartService = {
    // POST /v1/wholesaler/cart/add — Add item to cart
    addToCart: async (productId, quantity) => {
        const response = await api.post('/v1/wholesaler/cart/add', {
            product_id: productId,
            quantity: quantity,
        });
        return response.data;
    },

    // PUT /v1/wholesaler/cart/update — Update cart item quantity
    updateCartItem: async (productId, quantity) => {
        const response = await api.put('/v1/wholesaler/cart/update', {
            product_id: productId,
            quantity: quantity,
        });
        return response.data;
    },

    // GET /v1/wholesaler/cart — Get cart items (if endpoint exists)
    getCart: async () => {
        const response = await api.get('/v1/wholesaler/cart');
        return response.data;
    },

    // DELETE /v1/wholesaler/cart/remove — Remove item from cart (if endpoint exists)
    removeFromCart: async (productId) => {
        const response = await api.delete('/v1/wholesaler/cart/remove', {
            data: { product_id: productId },
        });
        return response.data;
    },
};

export default cartService;
