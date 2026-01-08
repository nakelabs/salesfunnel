import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const WholesalerDashboard = () => {
    const { addToCart, getCartItemsCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('relevance');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState(['in-stock']);

    // Product quantities state
    const [quantities, setQuantities] = useState({});

    const categories = [
        { id: 'all', name: 'All Products', icon: 'grid_view' },
        { id: 'beverages', name: 'Beverages', icon: 'local_cafe' },
        { id: 'snacks', name: 'Snacks', icon: 'cookie' },
        { id: 'dry-goods', name: 'Dry Goods', icon: 'grain' },
        { id: 'frozen', name: 'Frozen Foods', icon: 'ac_unit' },
        { id: 'cleaning', name: 'Cleaning', icon: 'clean_hands' },
    ];

    const distributors = [
        {
            id: 1,
            name: 'Metro Warehouse',
            location: 'Zone 4, Lagos',
            icon: 'warehouse',
            color: 'blue',
            rating: 4.9,
            reviews: '2.1k'
        },
        {
            id: 2,
            name: 'FastTrack Logistics',
            location: 'Ikeja, Lagos',
            icon: 'local_shipping',
            color: 'green',
            rating: 4.7,
            reviews: '850'
        },
        {
            id: 3,
            name: 'Global Imports Ltd.',
            location: 'Apapa, Lagos',
            icon: 'storefront',
            color: 'purple',
            rating: 4.8,
            reviews: '1.5k'
        },
        {
            id: 4,
            name: 'Prime Goods Co.',
            location: 'Victoria Island, Lagos',
            icon: 'inventory_2',
            color: 'orange',
            rating: 4.6,
            reviews: '500'
        },
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
            // Reset quantity after adding
            setQuantities(prev => ({ ...prev, [product.id]: 0 }));
            // Optional: Show success message
            console.log(`Added ${quantity} x ${product.name} to cart`);
        }
    };


    const formatPrice = (price) => {
        return `₦${price.toLocaleString()}`;
    };

    const getStockBadge = (product) => {
        if (product.status === 'out-of-stock') {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    Out of Stock
                </span>
            );
        } else if (product.status === 'low-stock') {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Low Stock ({product.stock})
                </span>
            );
        } else {
            return (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    In Stock ({product.stock}{product.stock >= 800 ? '+' : ''})
                </span>
            );
        }
    };

    return (
        <div className="bg-background-light font-display text-slate-900 antialiased selection:bg-primary/30 min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
                <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-3xl">filter_alt</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden md:block">SalesFunnel</h1>
                    </div>

                    <div className="hidden md:flex max-w-lg flex-1 px-8">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-slate-400">search</span>
                            </div>
                            <input
                                className="block w-full rounded-lg border-0 bg-slate-100 py-2.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Search products, SKUs, or brands..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden lg:flex items-center gap-6 mr-4">
                            <a className="text-sm font-medium text-slate-900 hover:text-primary transition-colors" href="#">Catalog</a>
                            <Link to="/orders" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">My Orders</Link>
                            <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">Dashboard</a>
                        </nav>

                        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                            <Link to="/cart" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {getCartItemsCount() > 0 && (
                                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                        {getCartItemsCount()}
                                    </span>
                                )}
                            </Link>
                            <Link to="/notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    3
                                </span>
                            </Link>
                            <Link to="/profile" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">account_circle</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-64px)] w-full">
                {/* Sidebar */}
                <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex overflow-y-auto">
                    <div className="p-6">
                        <div className="mb-8">
                            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Categories</h2>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full text-left ${selectedCategory === category.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Filters</h2>
                            <div className="space-y-3">
                                <details className="group rounded-lg border border-slate-200 bg-slate-50 open:bg-white open:ring-1 open:ring-slate-200" open>
                                    <summary className="flex cursor-pointer items-center justify-between p-3 text-sm font-medium text-slate-900">
                                        <span>Brand</span>
                                        <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180 text-[20px]">expand_more</span>
                                    </summary>
                                    <div className="px-3 pb-3 pt-0">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2">
                                                <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white" type="checkbox" />
                                                <span className="text-sm text-slate-600">Coca-Cola</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white" type="checkbox" />
                                                <span className="text-sm text-slate-600">Nestle</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white" type="checkbox" />
                                                <span className="text-sm text-slate-600">Kraft Heinz</span>
                                            </label>
                                        </div>
                                    </div>
                                </details>

                                <details className="group rounded-lg border border-slate-200 bg-slate-50 open:bg-white open:ring-1 open:ring-slate-200">
                                    <summary className="flex cursor-pointer items-center justify-between p-3 text-sm font-medium text-slate-900">
                                        <span>Availability</span>
                                        <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180 text-[20px]">expand_more</span>
                                    </summary>
                                    <div className="px-3 pb-3 pt-0">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2">
                                                <input checked className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white" type="checkbox" />
                                                <span className="text-sm text-slate-600">In Stock</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary bg-white" type="checkbox" />
                                                <span className="text-sm text-slate-600">Low Stock</span>
                                            </label>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-background-light">
                    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Browse Catalog</h1>
                                <p className="mt-2 text-base text-slate-500">All Products / Distributor Selection</p>
                            </div>
                        </div>

                        {/* Popular Distributors */}
                        <div className="mb-10">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-slate-900">Popular Distributors</h2>
                                <a className="text-sm font-medium text-primary hover:text-primary/80" href="#">View All</a>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {distributors.map((distributor) => (
                                    <a
                                        key={distributor.id}
                                        className="group relative flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
                                        href="#"
                                    >
                                        <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${distributor.color}-50 text-${distributor.color}-600`}>
                                            <span className="material-symbols-outlined text-3xl">{distributor.icon}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900">{distributor.name}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{distributor.location}</p>
                                        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-amber-500">
                                            <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                            <span>{distributor.rating} ({distributor.reviews} reviews)</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Search and Sort Bar */}
                        <div className="mb-8 rounded-xl bg-white p-4 shadow-sm border border-slate-200">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="material-symbols-outlined text-slate-400">search</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="Search by Product Name, SKU, or Brand"
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-full md:w-48">
                                        <select
                                            className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 pl-3 pr-10 text-slate-900 focus:border-primary focus:ring-primary sm:text-sm"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="relevance">Sort by: Relevance</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="name">Name: A-Z</option>
                                        </select>
                                    </div>
                                    <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`rounded p-1.5 ${viewMode === 'grid' ? 'text-slate-900 shadow-sm bg-white' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`rounded p-1.5 ${viewMode === 'list' ? 'text-slate-900 shadow-sm bg-white' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">view_list</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                            {products.map((product) => (
                                <div key={product.id} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                                    <Link to={`/product/${product.id}`} className="block">
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-100">
                                            {getStockBadge(product)}
                                            {product.status === 'out-of-stock' && (
                                                <div className="absolute inset-0 bg-white/50"></div>
                                            )}
                                            <img
                                                alt={product.name}
                                                className={`h-full w-full object-cover object-center transition-transform duration-300 ${product.status === 'out-of-stock' ? 'grayscale' : 'group-hover:scale-105'}`}
                                                src={product.images[0]}
                                            />
                                        </div>

                                        <div className={`flex flex-1 flex-col p-5 ${product.status === 'out-of-stock' ? 'opacity-75' : ''}`}>
                                            <div className="mb-2">
                                                <p className="text-xs font-medium text-slate-500">SKU: {product.sku}</p>
                                                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                                                <p className="text-sm text-slate-500">
                                                    {product.description} • <span className="text-primary font-medium">{product.distributor.name}</span>
                                                </p>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="mb-4 rounded-lg bg-slate-50 p-3 flex items-center justify-between border border-slate-100">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Market Price</span>
                                                        <span className="text-sm font-medium text-slate-400 line-through decoration-slate-400">{formatPrice(product.marketPrice)}</span>
                                                    </div>
                                                    <div className="h-8 w-px bg-slate-200 mx-2"></div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Sales Funnel</span>
                                                        <span className="text-xl font-bold text-primary">{formatPrice(product.salesFunnelPrice)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="p-5 pt-0">
                                        {product.status === 'out-of-stock' ? (
                                            <div className="flex items-center gap-3">
                                                <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-semibold text-slate-400 cursor-not-allowed" disabled>
                                                    Notify Me
                                                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-32 items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(product.id, -1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:text-primary hover:bg-slate-50"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">remove</span>
                                                    </button>
                                                    <input
                                                        className="w-8 border-0 bg-transparent p-0 text-center text-sm font-semibold text-slate-900 focus:ring-0"
                                                        type="text"
                                                        value={quantities[product.id] || 0}
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(product.id, 1)}
                                                        className="flex h-8 w-8 items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:text-primary hover:bg-slate-50"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                                                >
                                                    Add
                                                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div >
        </div >
    );
};

export default WholesalerDashboard;
