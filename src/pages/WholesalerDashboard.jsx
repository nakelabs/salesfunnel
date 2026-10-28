import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import productService from '../services/product.service';
import distributorService from '../services/distributor.service';

const WholesalerDashboard = () => {
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDistributor, setSelectedDistributor] = useState('all');
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [addedNotice, setAddedNotice] = useState({});

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
        }, 300);
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

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = { page_size: 100 };
                if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
                if (selectedCategory !== 'all') params.category = selectedCategory;
                if (showInStockOnly) params.available_only = true;
                if (selectedDistributor !== 'all') params.distributor_id = selectedDistributor;

                const data = await productService.getAll(params);
                let productList = Array.isArray(data) ? data : (data.products || data.data || []);

                setProducts(productList);

                // Build category list
                if (!debouncedSearch && selectedCategory === 'all' && !showInStockOnly) {
                    const cats = [...new Set(productList.map(p => p.category).filter(Boolean))];
                    setAllCategories(cats);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setProducts([]);
                setError('Failed to load products. Please check your connection and try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [debouncedSearch, selectedCategory, selectedDistributor, showInStockOnly]);

    // Categories list with count
    const categories = [
        { id: 'all', name: 'All Products', icon: 'apps' },
        ...allCategories.map(cat => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1),
            icon: cat.toLowerCase().includes('drink') ? 'local_bar' : 'category'
        })),
    ];

    const getQuantity = (productId) => quantities[productId] || 1;

    const handleQuantityChange = (productId, change) => {
        setQuantities(prev => {
            const current = prev[productId] || 1;
            const updated = Math.max(1, current + change);
            return { ...prev, [productId]: updated };
        });
    };

    const handleAddToCart = (product) => {
        const productId = product.id || product.product_id;
        const quantity = getQuantity(productId);
        
        addToCart({
            ...product,
            id: productId,
            price: product.price_per_case || product.price || 0,
            image: product.image_url || '',
        }, quantity);

        // Flash added feedback
        setAddedNotice(prev => ({ ...prev, [productId]: true }));
        setTimeout(() => {
            setAddedNotice(prev => ({ ...prev, [productId]: false }));
        }, 1500);
    };

    const formatPrice = (price) => {
        return `₦${Number(price).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Client-side sorting
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
            case 'stock':
                sorted.sort((a, b) => (b.stock_quantity ?? b.stock ?? 0) - (a.stock_quantity ?? a.stock ?? 0));
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

    // Helper to get distributor display name
    const getDistributorName = (distributorId) => {
        if (!distributorId) return null;
        const d = distributors.find(dist => (dist.id || dist.user_id || dist.distributor_id) === distributorId);
        return d ? (d.business_name || d.name) : null;
    };

    return (
        <div
            className="bg-[#f8fafc] text-slate-900 antialiased min-h-screen flex flex-col"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Top Navigation */}
            <WholesalerNavbar />

            {/* Header & Unified Command Bar */}
            <section className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Top Row: Search & Filters */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products by brand, name, or SKU..."
                                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            )}
                        </div>

                        {/* Controls (Distributor, In-Stock, Sort, View) */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Distributor Picker */}
                            <div className="relative min-w-[170px]">
                                <select
                                    value={selectedDistributor}
                                    onChange={(e) => setSelectedDistributor(e.target.value)}
                                    className="w-full appearance-none pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/70 focus:bg-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="all">All Distributors</option>
                                    {distributors.map(d => {
                                        const dId = d.user_id || d.id || d.distributor_id;
                                        const dName = d.business_name || d.name || `Distributor ${String(dId).slice(0, 8)}`;
                                        return <option key={dId} value={dId}>{dName}</option>;
                                    })}
                                </select>
                                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                                    expand_more
                                </span>
                            </div>

                            {/* In-Stock Toggle Pill */}
                            <button
                                onClick={() => setShowInStockOnly(!showInStockOnly)}
                                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                                    showInStockOnly
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${showInStockOnly ? 'bg-white' : 'bg-emerald-500'}`}></span>
                                In Stock
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/70 focus:bg-white focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="relevance">Sort: Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name: A–Z</option>
                                    <option value="stock">Highest Stock</option>
                                </select>
                                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                                    expand_more
                                </span>
                            </div>

                            {/* View Toggle */}
                            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-lg transition-all ${
                                        viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                                    }`}
                                    title="Grid View"
                                >
                                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-lg transition-all ${
                                        viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                                    }`}
                                    title="List View"
                                >
                                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Pills (Horizontal Scroll) */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-150 overflow-x-auto scrollbar-none pb-0.5">
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{category.icon}</span>
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Catalog Body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Catalog Context Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-xl font-bold text-slate-900">
                            Available Inventory
                        </h1>
                        <span className="bg-slate-200/70 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                            Escrow Protected
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-blue-600">local_shipping</span>
                            Direct Dispatch
                        </span>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-red-700 text-sm">
                        <span>{error}</span>
                        <button onClick={handleClearFilters} className="font-bold underline text-xs">
                            Reset filters
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                        <p className="text-slate-500 text-sm font-medium">Fetching real-time inventory…</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && sortedProducts.length === 0 && (
                    <div className="py-20 px-4 text-center bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <span className="material-symbols-outlined text-3xl">inventory_2</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No products match your criteria</h3>
                        <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                            Try broadening your search, resetting distributor filter, or checking out other categories.
                        </p>
                        <button
                            onClick={handleClearFilters}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

                {/* Products Grid View */}
                {!loading && sortedProducts.length > 0 && viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedProducts.map((product) => {
                            const productId = product.id || product.product_id;
                            const price = product.price_per_case || product.price || 0;
                            const stock = product.stock_quantity ?? product.stock ?? 0;
                            const isOutOfStock = !product.is_available || stock <= 0;
                            const imageUrl = product.image_url || '';
                            const distributorName = getDistributorName(product.distributor_id);
                            const currentQty = getQuantity(productId);
                            const isAdded = addedNotice[productId];

                            return (
                                <div
                                    key={productId}
                                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                                >
                                    <div>
                                        {/* Product Image Area */}
                                        <div className="relative w-full aspect-square bg-slate-50/70 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                            {/* Category Tag (Top-Left) */}
                                            {product.category && (
                                                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                                                    {product.category}
                                                </span>
                                            )}

                                            {/* Stock Status Tag (Top-Right) */}
                                            {isOutOfStock ? (
                                                <span className="absolute top-3 right-3 bg-red-50 border border-red-200/80 text-red-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                                                    Out of Stock
                                                </span>
                                            ) : stock <= 10 ? (
                                                <span className="absolute top-3 right-3 bg-amber-50 border border-amber-200/80 text-amber-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                                                    Low: {stock} cases
                                                </span>
                                            ) : (
                                                <span className="absolute top-3 right-3 bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    {stock} cases
                                                </span>
                                            )}

                                            {/* Product Image Link */}
                                            <Link to={`/product/${productId}`} className="w-full h-full flex items-center justify-center">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                                                            isOutOfStock ? 'opacity-40 grayscale' : ''
                                                        }`}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-300">
                                                        <span className="material-symbols-outlined text-5xl">inventory_2</span>
                                                    </div>
                                                )}
                                            </Link>
                                        </div>

                                        {/* Product Information */}
                                        <div className="p-4">
                                            {/* SKU & Distributor */}
                                            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
                                                <span>{product.sku ? `SKU: ${product.sku}` : 'ID: ' + String(productId).slice(0, 6)}</span>
                                                {distributorName && (
                                                    <span className="text-slate-500 font-sans truncate max-w-[120px]" title={distributorName}>
                                                        {distributorName}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Product Title */}
                                            <Link to={`/product/${productId}`}>
                                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-3">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            {/* Price Display */}
                                            <div className="flex items-baseline gap-1.5 mb-1">
                                                <span className="text-lg font-black text-slate-900 tracking-tight">
                                                    {formatPrice(price)}
                                                </span>
                                                <span className="text-xs text-slate-400 font-normal">/ case</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Bar (Stepper + Add to Cart) */}
                                    <div className="p-4 pt-0">
                                        {isOutOfStock ? (
                                            <button
                                                disabled
                                                className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl cursor-not-allowed text-center"
                                            >
                                                Out of Stock
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                {/* Quantity Stepper */}
                                                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, -1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                                                        {currentQty}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>

                                                {/* Add to Cart Button */}
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                                                        isAdded
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-slate-900 hover:bg-black text-white'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        {isAdded ? 'check' : 'add_shopping_cart'}
                                                    </span>
                                                    <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Products List View */}
                {!loading && sortedProducts.length > 0 && viewMode === 'list' && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-150 overflow-hidden">
                        {sortedProducts.map((product) => {
                            const productId = product.id || product.product_id;
                            const price = product.price_per_case || product.price || 0;
                            const stock = product.stock_quantity ?? product.stock ?? 0;
                            const isOutOfStock = !product.is_available || stock <= 0;
                            const imageUrl = product.image_url || '';
                            const distributorName = getDistributorName(product.distributor_id);
                            const currentQty = getQuantity(productId);
                            const isAdded = addedNotice[productId];

                            return (
                                <div
                                    key={productId}
                                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                                >
                                    {/* Left: Thumbnail & Details */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl p-2 flex-shrink-0 border border-slate-150 flex items-center justify-center">
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={product.name} className="h-full w-full object-contain" />
                                            ) : (
                                                <span className="material-symbols-outlined text-slate-300 text-2xl">inventory_2</span>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {product.category && (
                                                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                                        {product.category}
                                                    </span>
                                                )}
                                                {product.sku && (
                                                    <span className="text-[11px] text-slate-400 font-mono">
                                                        SKU: {product.sku}
                                                    </span>
                                                )}
                                            </div>

                                            <Link to={`/product/${productId}`}>
                                                <h3 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            {distributorName && (
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Distributor: <span className="font-semibold text-slate-700">{distributorName}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Middle: Stock status */}
                                    <div className="sm:text-center sm:px-4">
                                        {isOutOfStock ? (
                                            <span className="inline-block text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                                                Out of Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                {stock} in stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Right: Price & Stepper Action */}
                                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                        <div className="text-right">
                                            <div className="text-base font-black text-slate-900">{formatPrice(price)}</div>
                                            <div className="text-[11px] text-slate-400">per case</div>
                                        </div>

                                        {!isOutOfStock && (
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, -1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">remove</span>
                                                    </button>
                                                    <span className="w-7 text-center text-xs font-bold text-slate-900">{currentQty}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(productId, 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">add</span>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                                                        isAdded ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-black text-white'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">{isAdded ? 'check' : 'add_shopping_cart'}</span>
                                                    <span>{isAdded ? 'Added' : 'Add'}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default WholesalerDashboard;
