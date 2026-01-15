import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';

const InventoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const products = [
        {
            id: 1,
            name: 'Indomie Instant Noodles',
            description: 'Onion Chicken Flavor - 40pcs',
            category: 'Grains & Pasta',
            categoryColor: 'blue',
            sku: 'IND-40-OC-22',
            stock: 425,
            stockPercentage: 85,
            stockColor: 'green',
            marketPrice: 4200,
            salesPrice: 3950,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ZAs6VKx9GKNe33wk_Z78WThVT811yL7nD2bJDWsXiTjMSx8gjLPNaDGHpQRxumpfu4rTmkn07RaxKsL8QCT4wXoamSgA31QS4dWWss_YCkTsUPLhR9tguLVSP4mJ62LfW_X2mVXAEnixWTZgB5ioTSYwjst9S-hFobp1O8p5vpAifQm5wdmyZkHy8TvDdTPZzcpdC3jKhr7ZjfkrXQALa4zILxm1ZipxXG08yP0FhACEOQo-_kWm-xGVMv3ip_xC5WoJpPQ1Gpos'
        },
        {
            id: 2,
            name: 'Dangote Sugar',
            description: 'Granulated 1kg x 10',
            category: 'Staple Foods',
            categoryColor: 'orange',
            sku: 'DAN-SG-10X',
            stock: 8,
            stockPercentage: 8,
            stockColor: 'red',
            isLowStock: true,
            marketPrice: 12500,
            salesPrice: 11800,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvyCLOUv-OAFsyKbTF9-LVbiI-C4QKJ8Y_Y9qlQohhfvUbs4IbJH8cDvxXQ5X8xhOXIq3n_JLOwCCHgy7ng74IvfPuj14WN3FUqNAr7r9yHpN2LQuVsAOdriV7JFPyZT2hpvVhigQ B7sI_xYbQVzplYPOsbnoXSYGEEHpmBE1ZG-ifT7UWWNA-daleS1NdVbMxmMOPco3oZadALM6-rw86eoDvVB_lS4leGfk5JOVFiVYy0VQ6vj195ODsj2zJ3mHD7q_PLJk60GMa'
        },
        {
            id: 3,
            name: 'Coca-Cola Classic',
            description: '35cl Glass Bottle x 24',
            category: 'Beverages',
            categoryColor: 'purple',
            sku: 'COC-CL-35X',
            stock: 112,
            stockPercentage: 45,
            stockColor: 'blue',
            marketPrice: 3600,
            salesPrice: 3400,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxB3E1tjvs3_82ct6rC720fra7idjp6QxKmOR5sdDJ5mLywrVvmISTJzlrf4UPGfOhN4H-ukAvYetWSLaTUhx60nXB0uzoponkpm6UwHkOOR4BzvvYtN3jJyzpxEFx48dTPZ_Mxk_GEu7t2fs0LJX_1K54pb0P5VGXGGAIrByTww2UXqFg7yNpnrD_Emz4CBt2cJGUfbpzylRKTplu4164FKQPbKuyoBhAnsSmKB_g_byr0zP8AWfDERDlEXF5wWf2XCITkqvDtCbq'
        },
        {
            id: 4,
            name: 'Nestle Milo Refill',
            description: '400g x 12 Packets',
            category: 'Beverages',
            categoryColor: 'purple',
            sku: 'NES-ML-400R',
            stock: 28,
            stockPercentage: 25,
            stockColor: 'orange',
            marketPrice: 28000,
            salesPrice: 26500,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_mQJy2fbJopDgxZZrA4J5V3pLRu2WigYxZuyK1r7LFJU15exjNRQGLC_MoXDbT0HxO5IjIMh4U_KoU-6jIriypUZ1mHwTP1j2gumAQkFGtLuder83uVlMeGIcc7uUznqG0eDV0-mtf-XyVf9TRb3EZ3LfM2FCnMD4mmnWoqG5LxatWvu-cJbe6rgx6wJGQo3bbgxyJL6D5Vdky-cNy0UCSvrODCaVT-9OFvnHSmMhbkzwS2fOVps0Vf0V5quFolGEF4CC4JN3eTr'
        }
    ];

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
