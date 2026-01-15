import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

import WholesalerNavbar from '../components/WholesalerNavbar';

const WholesalerDashboard = () => {
    const { addToCart, getCartItemsCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [quantities, setQuantities] = useState({});

    const categories = [
        { id: 'all', name: 'All Products', icon: 'grid_view' },
        { id: 'beverages', name: 'Beverages', icon: 'local_cafe' },
        { id: 'snacks', name: 'Snacks', icon: 'cookie' },
        { id: 'dry-goods', name: 'Dry Goods', icon: 'grain' },
        { id: 'frozen', name: 'Frozen Foods', icon: 'ac_unit' },
        { id: 'cleaning', name: 'Cleaning', icon: 'clean_hands' },
    ];

    const handleQuantityChange = (productId, change) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] || 0) + change)
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 0;
        if (quantity > 0) {
            addToCart(product, quantity);
            setQuantities(prev => ({ ...prev, [product.id]: 0 }));
            console.log(`Added ${quantity} x ${product.name} to cart`);
        }
    };

    const formatPrice = (price) => {
        return `₦${price.toLocaleString()}`;
    };

    const calculateSavings = (marketPrice, salesPrice) => {
        return marketPrice - salesPrice;
    };

    const getStockBadge = (product) => {
        if (product.status === 'out-of-stock') {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Out of Stock
                </span>
            );
        } else if (product.status === 'low-stock') {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Low Stock
                </span>
            );
        }
        return null;
    };

    // Filter and Sort Products
    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query) ||
                product.brand?.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Apply stock filter
        if (showInStockOnly) {
            filtered = filtered.filter(product => product.status !== 'out-of-stock');
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.salesFunnelPrice - b.salesFunnelPrice);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.salesFunnelPrice - a.salesFunnelPrice);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // relevance - keep original order
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredAndSortedProducts();

    return (
        <div className="bg-slate-50 font-display text-slate-900 antialiased min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Horizontal Category Tabs */}
            <div className="sticky top-16 z-40 bg-slate-50 px-6 lg:px-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 min-w-max justify-center">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${selectedCategory === category.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-600 hover:text-primary hover:border-slate-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content - No Sidebar */}
            <main className="w-full">
                <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Greeting */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">What are you buying today?</h2>
                    </div>

                    {/* Search and Controls */}
                    <div className="mb-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-xl">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <span className="material-symbols-outlined text-slate-400">search</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    placeholder="Search products, SKUs, or brands..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3">
                                {/* In Stock Toggle */}
                                <button
                                    onClick={() => setShowInStockOnly(!showInStockOnly)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${showInStockOnly
                                        ? 'bg-primary text-white'
                                        : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
                                        }`}
                                >
                                    In Stock Only
                                </button>

                                {/* Sort Dropdown */}
                                <select
                                    className="rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-sm font-medium text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="relevance">Sort: Relevance</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A-Z</option>
                                </select>

                                {/* View Toggle */}
                                <div className="flex rounded-lg border border-slate-300 bg-white p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`rounded p-2 transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`rounded p-2 transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                                    <Link to={`/product/${product.id}`} className="block">
                                        {/* Product Image */}
                                        <div className="relative w-full overflow-hidden bg-slate-50 aspect-square">
                                            {product.status === 'out-of-stock' && (
                                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</span>
                                                </div>
                                            )}
                                            <img
                                                alt={product.name}
                                                className={`h-full w-full object-cover object-center transition-transform duration-300 ${product.status === 'out-of-stock' ? 'grayscale' : 'group-hover:scale-105'
                                                    }`}
                                                src={product.images[0]}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className={`flex flex-col p-4 ${product.status === 'out-of-stock' ? 'opacity-60' : ''}`}>
                                            <h3 className="text-sm font-medium text-slate-900 mb-1 line-clamp-2 min-h-[40px]">
                                                {product.name}
                                            </h3>

                                            {/* Price with labels */}
                                            <div className="space-y-1.5 mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Market Price:</span>
                                                    <span className="text-sm text-slate-400 line-through">{formatPrice(product.marketPrice)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">SalesFunnel Price:</span>
                                                    <span className="text-xl font-bold text-primary">{formatPrice(product.salesFunnelPrice)}</span>
                                                </div>
                                            </div>

                                            {/* SKU */}
                                            <p className="text-xs text-slate-400">SKU: {product.sku}</p>
                                        </div>
                                    </Link>

                                    {/* Add to Cart - Minimal */}
                                    {product.status !== 'out-of-stock' && (
                                        <div className="px-4 pb-4 flex items-center gap-2">
                                            <div className="flex items-center border border-slate-200 rounded">
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, -1)}
                                                    className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                                </button>
                                                <input
                                                    className="w-10 border-0 bg-transparent p-0 text-center text-sm font-medium text-slate-900 focus:ring-0"
                                                    type="text"
                                                    value={quantities[product.id] || 0}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, 1)}
                                                    className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                            </div>
                                            {quantities[product.id] > 0 && (
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="flex-1 h-8 px-3 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 mb-6">Try adjusting your filters or search query</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setShowInStockOnly(false);
                                    setSortBy('relevance');
                                }}
                                className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )
                    }
                </div >
            </main >
        </div >
    );
};

export default WholesalerDashboard;
