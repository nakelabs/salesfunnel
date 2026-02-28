import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import productService from '../services/product.service';
import distributorService from '../services/distributor.service';

const WholesalerDashboard = () => {
    const { addToCart, getCartItemsCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDistributor, setSelectedDistributor] = useState('all');
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [quantities, setQuantities] = useState({});

    const [products, setProducts] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const debounceTimer = useRef(null);

    // Debounce search input
    useEffect(() => {
        debounceTimer.current = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 400);
        return () => clearTimeout(debounceTimer.current);
    }, [searchQuery]);

    // Fetch distributors on mount
    useEffect(() => {
        const fetchDistributors = async () => {
            try {
                const data = await distributorService.getAllDistributors();
                const list = Array.isArray(data) ? data : (data.distributors || data.data || []);
                setDistributors(list);
            } catch (err) {
                console.error('Failed to fetch distributors:', err);
            }
        };
        fetchDistributors();
    }, []);

    // Fetch products — uses different endpoints based on distributor selection
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                let productList = [];

                if (selectedDistributor === 'all') {
                    // No distributor selected → GET /v1/products (all products)
                    const params = { page_size: 100 };
                    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
                    if (selectedCategory !== 'all') params.category = selectedCategory;
                    if (showInStockOnly) params.available_only = true;

                    const data = await productService.getAll(params);
                    productList = Array.isArray(data) ? data : (data.products || data.data || []);
                } else {
                    // Specific distributor → GET /v1/distributors/{distributor_id}/products
                    const params = { page_size: 100 };
                    if (showInStockOnly) params.available_only = true;

                    const data = await distributorService.getDistributorProducts(selectedDistributor, params);
                    productList = Array.isArray(data) ? data : (data.products || data.data || []);

                    // Apply client-side search filter (this endpoint may not support search param)
                    if (debouncedSearch.trim()) {
                        const query = debouncedSearch.toLowerCase();
                        productList = productList.filter(p =>
                            (p.name || '').toLowerCase().includes(query)
                        );
                    }
                    // Apply client-side category filter
                    if (selectedCategory !== 'all') {
                        productList = productList.filter(p =>
                            (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
                        );
                    }
                }

                setProducts(productList);

                // Build category list from initial unfiltered load
                if (!debouncedSearch && selectedCategory === 'all' && selectedDistributor === 'all' && !showInStockOnly) {
                    const cats = [...new Set(productList.map(p => p.category).filter(Boolean))];
                    setAllCategories(cats);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [debouncedSearch, selectedCategory, selectedDistributor, showInStockOnly]);

    // Categories for tabs (persisted from initial load so they don't disappear when filtering)
    const categories = [
        { id: 'all', name: 'All Products', icon: 'grid_view' },
        ...allCategories.map(cat => ({ id: cat, name: cat, icon: 'category' })),
    ];

    const handleQuantityChange = (productId, change) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] || 0) + change)
        }));
    };

    const handleAddToCart = (product) => {
        const productId = product.id || product.product_id;
        const quantity = quantities[productId] || 0;
        if (quantity > 0) {
            addToCart({
                ...product,
                id: productId,
                price: product.price_per_case || product.price || 0,
                image: product.image_url || '',
            }, quantity);
            setQuantities(prev => ({ ...prev, [productId]: 0 }));
        }
    };

    const formatPrice = (price) => {
        return `₦${price.toLocaleString()}`;
    };

    const getStockBadge = (product) => {
        const stock = product.stock_quantity ?? product.stock ?? 0;
        if (!product.is_available || stock <= 0) {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Out of Stock
                </span>
            );
        } else if (stock > 0 && stock <= 10) {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Low Stock
                </span>
            );
        }
        return null;
    };

    // Client-side sorting (API doesn't support sort params)
    const getSortedProducts = () => {
        let sorted = [...products];
        const getPrice = (p) => p.price_per_case || p.price || 0;
        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => getPrice(a) - getPrice(b));
                break;
            case 'price-high':
                sorted.sort((a, b) => getPrice(b) - getPrice(a));
                break;
            case 'name':
                sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            default:
                break;
        }
        return sorted;
    };

    const sortedProducts = getSortedProducts();

    const handleClearFilters = () => {
        setSearchQuery('');
        setDebouncedSearch('');
        setSelectedCategory('all');
        setSelectedDistributor('all');
        setShowInStockOnly(false);
        setSortBy('relevance');
    };

    return (
        <div className="bg-slate-50 font-display text-slate-900 antialiased min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Filters Bar */}
            <div className="sticky top-16 z-40 bg-slate-50 px-6 lg:px-8 border-b border-slate-200">
                {/* Distributor Filter */}
                <div className="max-w-7xl mx-auto py-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Browse from:</label>
                    <select
                        value={selectedDistributor}
                        onChange={(e) => setSelectedDistributor(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                        <option value="all">All Distributors</option>
                        {distributors.map(d => {
                            const dId = d.id || d.distributor_id;
                            const dName = d.business_name || d.name || `Distributor ${String(dId).slice(0, 8)}`;
                            return <option key={dId} value={dId}>{dName}</option>;
                        })}
                    </select>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-1 min-w-max overflow-x-auto scrollbar-hide pb-0">
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

            {/* Main Content */}
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
                                    placeholder="Search products by name..."
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

                    {/* Loading Products */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                            <p className="text-slate-500 text-sm">Loading products…</p>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!loading && sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product) => {
                                const productId = product.id || product.product_id;
                                const price = product.price_per_case || product.price || 0;
                                const stock = product.stock_quantity ?? product.stock ?? 0;
                                const isOutOfStock = !product.is_available || stock <= 0;
                                const imageUrl = product.image_url || '';

                                return (
                                    <div key={productId} className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                                        <Link to={`/product/${productId}`} className="block">
                                            {/* Product Image */}
                                            <div className="relative w-full overflow-hidden bg-slate-100 aspect-square">
                                                {getStockBadge(product)}
                                                {isOutOfStock && (
                                                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</span>
                                                    </div>
                                                )}
                                                {imageUrl ? (
                                                    <img
                                                        alt={product.name}
                                                        className={`h-full w-full object-cover object-center transition-transform duration-300 ${isOutOfStock ? 'grayscale' : 'group-hover:scale-105'}`}
                                                        src={imageUrl}
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <span className="material-symbols-outlined text-5xl text-slate-300">inventory_2</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className={`flex flex-col p-4 ${isOutOfStock ? 'opacity-60' : ''}`}>
                                                <h3 className="text-sm font-medium text-slate-900 mb-1 line-clamp-2 min-h-[40px]">
                                                    {product.name}
                                                </h3>

                                                {/* Price */}
                                                <div className="mb-2">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Price per Case:</span>
                                                    <p className="text-xl font-bold text-primary">{formatPrice(price)}</p>
                                                </div>

                                                {/* SKU & Stock */}
                                                <div className="flex items-center justify-between">
                                                    {product.sku && <p className="text-xs text-slate-400">SKU: {product.sku}</p>}
                                                    <p className={`text-xs font-semibold ${stock > 10 ? 'text-green-600' : stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                                                        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Add to Cart */}
                                        {!isOutOfStock && (
                                            <div className="px-4 pb-4 flex items-center gap-2">
                                                <div className="flex items-center border border-slate-200 rounded">
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, -1)}
                                                        className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <input
                                                        className="w-10 border-0 bg-transparent p-0 text-center text-sm font-medium text-slate-900 focus:ring-0"
                                                        type="text"
                                                        value={quantities[productId] || 0}
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, 1)}
                                                        className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                                {(quantities[productId] || 0) > 0 && (
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
                                );
                            })}
                        </div>
                    ) : !loading && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 mb-6">Try adjusting your filters or search query</p>
                            <button
                                onClick={handleClearFilters}
                                className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default WholesalerDashboard;

