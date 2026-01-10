import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvyCLOUv-OAFsyKbTF9-LVbiI-C4QKJ8Y_Y9qlQohhfvUbs4IbJH8cDvxXQ5X8xhOXIq3n_JLOwCCHgy7ng74IvfPuj14WN3FUqNAr7r9yHpN2LQuVsAOdriV7JFPyZT2hpvVhigQB7sI_xYbQVzplYPOsbnoXSYGEEHpmBE1ZG-ifT7UWWNA-daleS1NdVbMxmMOPco3oZadALM6-rw86eoDvVB_lS4leGfk5JOVFiVYy0VQ6vj195ODsj2zJ3mHD7q_PLJk60GMa'
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

    const categories = [
        'All Categories',
        'Beverages',
        'Dairy & Eggs',
        'Grains & Pasta',
        'Snacks & Confectionery',
        'Toiletries',
        'Staple Foods'
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

    const totalSKUs = 1284;
    const lowStockCount = 12;

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

    const getCategoryBadgeClasses = (color) => {
        const classes = {
            blue: 'bg-blue-50 text-blue-600',
            orange: 'bg-orange-50 text-orange-600',
            purple: 'bg-purple-50 text-purple-600'
        };
        return classes[color] || 'bg-slate-50 text-slate-600';
    };

    const getStockBarColor = (color) => {
        const colors = {
            green: 'bg-green-500',
            red: 'bg-red-500',
            blue: 'bg-primary',
            orange: 'bg-orange-500'
        };
        return colors[color] || 'bg-slate-500';
    };

    return (
        <div className="bg-background-light font-display flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white sticky top-0 h-screen hidden lg:flex flex-col">
                {/* Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-1.5">
                            <span className="material-symbols-outlined text-white">inventory_2</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                            <p className="text-slate-500 text-xs font-medium">Distributor Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link
                        to="/distributor-dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined opacity-70">dashboard</span>
                        Dashboard
                    </Link>
                    <Link
                        to="/inventory"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-primary/10 text-primary border-r-4 border-primary"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                            inventory_2
                        </span>
                        Inventory
                    </Link>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined opacity-70">payments</span>
                        Payments
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined opacity-70">settings</span>
                        Settings
                    </a>
                </nav>

                {/* User Profile */}
                <div className="p-4 bg-slate-50 m-4 rounded-xl">
                    <Link to="/distributor-profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="size-10 rounded-full bg-slate-200"></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Premium Trading</p>
                            <p className="text-xs text-slate-500 truncate">Lagos, NG</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">inventory_2</span>
                            <h2 className="text-lg font-bold">Inventory Management</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-transparent focus-within:border-primary/50 transition-all">
                            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-48 outline-none"
                                placeholder="Global search..."
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Link to="/distributor-notifications" className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 relative transition-colors">
                                <span className="material-symbols-outlined text-[22px]">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </Link>
                            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined text-[22px]">help</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6 max-w-[1200px] mx-auto w-full overflow-y-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm mb-6 text-slate-500 font-medium">
                        <Link to="/distributor-dashboard" className="hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900">Inventory Management</span>
                    </nav>

                    {/* Page Headline */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Product Stock</h1>
                            <p className="text-slate-500 mt-1">Manage your wholesale product catalog and pricing.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-center px-4 border-r border-slate-100">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total SKUs</p>
                                <p className="text-xl font-bold">{totalSKUs}</p>
                            </div>
                            <div className="text-center px-4">
                                <p className="text-xs text-red-500 uppercase tracking-wider font-bold">Low Stock</p>
                                <p className="text-xl font-bold text-red-500">{lowStockCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="flex flex-1 gap-3 w-full">
                                <div className="relative flex-1 max-w-md">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                                        search
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2 bg-background-light border-slate-200 rounded-lg focus:ring-primary focus:border-primary"
                                        placeholder="Search product, SKU or category..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="bg-background-light border-slate-200 rounded-lg py-2 px-4 focus:ring-primary focus:border-primary text-sm font-medium"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map((cat, index) => (
                                        <option key={index} value={index === 0 ? 'all' : cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                    <span className="material-symbols-outlined text-slate-600">filter_list</span>
                                </button>
                            </div>
                            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-600 transition-all shadow-md active:scale-95">
                                <span className="material-symbols-outlined text-xl">add</span>
                                Add New Product
                            </button>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                                        <th className="px-6 py-4">Product Info</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">Stock Level</th>
                                        <th className="px-6 py-4">Market Price</th>
                                        <th className="px-6 py-4">SalesFunnel Price</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="size-12 rounded-lg bg-slate-100 flex-shrink-0 bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${product.image})` }}
                                                    ></div>
                                                    <div>
                                                        <p className="font-bold text-sm">{product.name}</p>
                                                        <p className="text-xs text-slate-500">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 ${getCategoryBadgeClasses(product.categoryColor)} text-[10px] font-bold rounded uppercase`}>
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-500">{product.sku}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-bold ${product.isLowStock ? 'text-red-500' : ''}`}>
                                                            {product.stock} Cases
                                                        </span>
                                                        {product.isLowStock && (
                                                            <span className="material-symbols-outlined text-red-500 text-sm animate-pulse">
                                                                warning
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`${getStockBarColor(product.stockColor)} h-full`}
                                                            style={{ width: `${product.stockPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold">{formatPrice(product.marketPrice)}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-primary font-bold">{formatPrice(product.salesPrice)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-primary/10 rounded-lg">
                                                        <span className="material-symbols-outlined text-xl">edit</span>
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg">
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
                            <p className="text-sm text-slate-500 font-medium">
                                Showing <span className="text-slate-900">1-10</span> of <span className="text-slate-900">1,284</span> products
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="size-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                                <button className="size-8 rounded-lg hover:bg-slate-200 text-sm font-bold">2</button>
                                <button className="size-8 rounded-lg hover:bg-slate-200 text-sm font-bold">3</button>
                                <span className="text-slate-500">...</span>
                                <button className="size-8 rounded-lg hover:bg-slate-200 text-sm font-bold">129</button>
                                <button className="p-2 rounded-lg border border-slate-200 hover:bg-white">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                        <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                            Export to CSV
                        </button>
                        <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
                            Print Inventory List
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InventoryPage;
