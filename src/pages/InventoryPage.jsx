import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';

const InventoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const products = [];

    const filteredProducts = products.filter(product => {
        const matchesSearch = searchQuery === '' ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

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
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Inventory Management</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your product catalog</p>
                </div>

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
                            <option value="Grains & Pasta">Grains & Pasta</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Staple Foods">Staple Foods</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
                                        <p className="text-sm text-slate-500">{product.description}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${product.categoryColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                                        product.categoryColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                                            'bg-purple-100 text-purple-700'
                                        }`}>
                                        {product.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-slate-600">Stock Level</span>
                                        <span className={`text-xs font-bold ${product.stockColor === 'green' ? 'text-green-600' :
                                            product.stockColor === 'red' ? 'text-red-600' :
                                                product.stockColor === 'orange' ? 'text-orange-600' :
                                                    'text-blue-600'
                                            }`}>
                                            {product.stock} units
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${product.stockColor === 'green' ? 'bg-green-500' :
                                                product.stockColor === 'red' ? 'bg-red-500' :
                                                    product.stockColor === 'orange' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                }`}
                                            style={{ width: `${product.stockPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500">Your Price</p>
                                            <p className="text-xl font-bold text-primary">₦{product.salesPrice.toLocaleString()}</p>
                                        </div>
                                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InventoryPage;
