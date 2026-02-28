import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';
import authService from '../services/auth.service';

const InventoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // track which product action is in progress

    const user = authService.getCurrentUser();
    const distributorId = user?.id;
    const navigate = useNavigate();

    // Fetch distributor products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        if (!distributorId) {
            setError('User not found. Please login again.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await distributorService.getDistributorProducts(distributorId);
            // Handle both array response and paginated response
            const productList = Array.isArray(data) ? data : (data.products || data.data || []);
            setProducts(productList);
        } catch (err) {
            console.error('Failed to fetch distributor products:', err);
            setError(err.response?.data?.detail || 'Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to remove this product from your catalog?')) return;

        try {
            setActionLoading(productId);
            await distributorService.deleteDistributorProduct(distributorId, productId);
            setProducts(prev => prev.filter(p => (p.id || p.product_id) !== productId));
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert(err.response?.data?.detail || 'Failed to delete product.');
        } finally {
            setActionLoading(null);
        }
    };

    // Extract unique categories from products
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = searchQuery === '' ||
            (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.sku || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.category || '').toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Inventory Management</h2>
                        <p className="text-sm text-slate-500 mt-1">Manage your product catalog</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 font-medium">
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                        </span>
                        <button
                            onClick={() => navigate('/inventory/add')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <div className="flex-1">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <button onClick={fetchProducts} className="text-sm font-semibold text-red-600 hover:text-red-800">
                            Retry
                        </button>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 text-sm">Loading your products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">inventory_2</span>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">
                            {searchQuery || selectedCategory !== 'all' ? 'No matching products' : 'No products yet'}
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                            {searchQuery || selectedCategory !== 'all'
                                ? 'Try adjusting your search or filter.'
                                : 'Add products to your catalog to get started.'}
                        </p>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => {
                            const productId = product.id || product.product_id;
                            const stockLevel = product.stock_quantity ?? product.stock ?? product.quantity ?? 0;
                            const maxStock = product.max_stock || 100;
                            const stockPercentage = Math.min((stockLevel / maxStock) * 100, 100);
                            const stockColor = stockPercentage > 60 ? 'green' : stockPercentage > 25 ? 'orange' : 'red';
                            const price = product.price_per_case || product.price || product.unit_price || product.salesPrice || 0;

                            return (
                                <div key={productId} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                                    {product.image_url && (
                                        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 text-lg">{product.name || product.product_name}</h3>
                                                <p className="text-sm text-slate-500">{product.description || ''}</p>
                                            </div>
                                            {product.category && (
                                                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                    {product.category}
                                                </span>
                                            )}
                                        </div>

                                        {product.sku && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-slate-600">Stock Level</span>
                                                <span className={`text-xs font-bold ${stockColor === 'green' ? 'text-green-600' :
                                                    stockColor === 'red' ? 'text-red-600' : 'text-orange-600'
                                                    }`}>
                                                    {stockLevel} units
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${stockColor === 'green' ? 'bg-green-500' :
                                                        stockColor === 'red' ? 'bg-red-500' : 'bg-orange-500'
                                                        }`}
                                                    style={{ width: `${stockPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-100 pt-4 mt-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-slate-500">Your Price</p>
                                                    <p className="text-xl font-bold text-primary">₦{Number(price).toLocaleString()}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDeleteProduct(productId)}
                                                        disabled={actionLoading === productId}
                                                        className="px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === productId ? '...' : 'Remove'}
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/inventory/edit/${productId}`)}
                                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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

export default InventoryPage;
