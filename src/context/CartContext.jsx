import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cart.service';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // Load cart from localStorage on initial render
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('salesfunnel_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('salesfunnel_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (product, quantity = 1) => {
        const productId = product.id || product.product_id;

        // Optimistic local update first for instant UI feedback
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productId);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, {
                    id: productId,
                    name: product.name || 'Untitled',
                    sku: product.sku || '',
                    image: product.image || product.image_url || '',
                    unitPrice: product.price || product.price_per_case || 0,
                    quantity: quantity,
                    stockStatus: product.is_available === false ? 'Out of Stock' : 'In Stock',
                }];
            }
        });

        // Call backend API
        try {
            await cartService.addToCart(productId, quantity);
        } catch (err) {
            console.error('Failed to sync cart add with server:', err);
            // Cart item stays locally even if API fails
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));

        // Fire-and-forget backend call
        cartService.removeFromCart(productId).catch(err => {
            console.error('Failed to sync cart remove with server:', err);
        });
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        // Optimistic local update
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );

        // Call backend API
        try {
            await cartService.updateCartItem(productId, newQuantity);
        } catch (err) {
            console.error('Failed to sync cart update with server:', err);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
