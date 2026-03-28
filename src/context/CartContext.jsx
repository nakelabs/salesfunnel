import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cart.service';
import productService from '../services/product.service';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    // Initialize cart state (loaded from API on mount)
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoading, setIsCartLoading] = useState(true);

    // Fetch actual cart from backend on mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await cartService.getCart();
                const items = response.cart_items || response.items || (Array.isArray(response) ? response : []);
                
                if (items) {
                    const mappedItems = await Promise.all(items.map(async item => {
                        let product = item.product || item.product_details || item;
                        
                        // If the backend only returned an ID and quantity, fetch the full product details
                        const hasNoDetails = !product.name && !item.name && !product.product_name && !item.product_name && !product.title;
                        const productId = item.product_id || product.id || product.product_id || item.id;
                        
                        // Wait, backend explicitly provides product_name.
                        let finalProduct = { ...product };
                        if (hasNoDetails && productId) {
                            try {
                                const fullProduct = await productService.getById(productId);
                                if (fullProduct) {
                                    finalProduct = { ...finalProduct, ...fullProduct };
                                }
                            } catch (error) {
                                console.error(`Failed to fetch details for product ${productId}:`, error);
                            }
                        }

                        return {
                            id: productId,
                            name: item.product_name || finalProduct.name || finalProduct.product_name || finalProduct.title || item.name || 'Untitled',
                            sku: item.product_sku || finalProduct.sku || item.sku || '',
                            image: item.product_image_url || finalProduct.image_url || finalProduct.image || finalProduct.product_image || item.image_url || item.image || '',
                            unitPrice: Number(item.unit_price) || Number(finalProduct.price) || Number(finalProduct.price_per_case) || Number(item.price) || 0,
                            quantity: Number(item.quantity) || Number(finalProduct.quantity) || 1,
                            stockStatus: (finalProduct.is_available === false || item.is_available === false) ? 'Out of Stock' : 'In Stock',
                            _raw: item
                        };
                    }));
                    setCartItems(mappedItems);
                }
            } catch (err) {
                console.error('Failed to fetch cart from server:', err);
            } finally {
                setIsCartLoading(false);
            }
        };

        fetchCart();
    }, []);



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
        isCartLoading,
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
