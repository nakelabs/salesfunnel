import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Product will come from API
    const product = null;

    const [quantity, setQuantity] = useState(10);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    // If product not found, redirect to dashboard
    if (!product) {
        navigate('/dashboard');
        return null;
    }

    const handleQuantityChange = (change) => {
        setQuantity(Math.max(1, quantity + change));
    };

    const getCurrentPrice = () => {
        for (const tier of product.pricingTiers) {
            if (quantity >= tier.min && (tier.max === null || quantity <= tier.max)) {
                return tier.price;
            }
        }
        return product.salesFunnelPrice;
    };

    return (
        <div className="bg-background-light min-h-screen text-slate-900" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <WholesalerNavbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <Link to="/dashboard" className="hover:text-primary transition-colors">Beverages</Link>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <a className="hover:text-primary transition-colors" href="#">Soft Drinks</a>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <span className="text-slate-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-slate-200 flex items-center justify-center p-8">
                            <div
                                className="w-full h-full bg-center bg-contain bg-no-repeat"
                                style={{ backgroundImage: `url('${product.images[selectedImage]}')` }}
                            ></div>
                            <div className="absolute top-4 left-4 rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 uppercase tracking-wide">
                                In Stock
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg ${selectedImage === index
                                        ? 'border-2 border-primary'
                                        : 'border border-slate-200 hover:border-primary/50'
                                        } bg-white p-2`}
                                >
                                    <div
                                        className="h-full w-full bg-center bg-contain bg-no-repeat"
                                        style={{ backgroundImage: `url('${image}')` }}
                                    ></div>
                                </button>
                            ))}
                        </div>

                        {/* Tabs - Description, Specs, Distributor Info */}
                        <div className="mt-8 hidden lg:block">
                            <div className="mb-4 border-b border-slate-200">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                                    <li className="mr-2">
                                        <button
                                            onClick={() => setActiveTab('description')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'description'
                                                ? 'border-primary text-primary'
                                                : 'border-transparent hover:text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            Description
                                        </button>
                                    </li>
                                    <li className="mr-2">
                                        <button
                                            onClick={() => setActiveTab('specifications')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'specifications'
                                                ? 'border-primary text-primary'
                                                : 'border-transparent hover:text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            Specifications
                                        </button>
                                    </li>
                                    <li className="mr-2">
                                        <button
                                            onClick={() => setActiveTab('distributor')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'distributor'
                                                ? 'border-primary text-primary'
                                                : 'border-transparent hover:text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            Distributor Info
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white rounded-lg">
                                {activeTab === 'description' && (
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        {product.fullDescription}
                                    </p>
                                )}
                                {activeTab === 'specifications' && (
                                    <dl className="space-y-3">
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <dt className="text-slate-500">Unit Volume</dt>
                                            <dd className="font-medium text-slate-900">{product.specs.unitVolume}</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <dt className="text-slate-500">Case Count</dt>
                                            <dd className="font-medium text-slate-900">{product.specs.caseCount}</dd>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2">
                                            <dt className="text-slate-500">Material</dt>
                                            <dd className="font-medium text-slate-900">{product.specs.material}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-slate-500">Origin</dt>
                                            <dd className="font-medium text-slate-900">{product.specs.origin}</dd>
                                        </div>
                                    </dl>
                                )}
                                {activeTab === 'distributor' && (
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">{product.distributor.name}</h4>
                                        <p className="text-slate-600">Authorized distributor for Coca-Cola products in Lagos region.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Info & Purchase */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Product Title & Meta */}
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                {product.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                                <span className="font-medium text-primary">Brand: {product.brand}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <span>SKU: {product.sku}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <div className="flex items-center text-yellow-500">
                                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                                    <span className="ml-1 text-slate-700">{product.rating} ({product.orders} orders)</span>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
                            <div className="bg-slate-50 rounded-lg p-5 flex items-center justify-between border border-slate-100 mb-6">
                                <div className="flex flex-col border-r border-slate-200 pr-6 mr-6">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Market Price</span>
                                    <span className="text-xl font-medium text-slate-400 line-through decoration-slate-400/50 decoration-2">
                                        ₦ {product.marketPrice.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex flex-col text-right flex-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Sales Funnel</span>
                                    <span className="text-3xl font-black text-primary">
                                        ₦ {getCurrentPrice().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">Includes 12 bottles per case. VAT inclusive.</p>

                            {/* Stock Status */}
                            <div className="mt-4 flex items-center gap-3">
                                <span className="flex size-3 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]"></span>
                                <span className="text-sm font-medium text-green-700">In Stock</span>
                                <span className="text-sm text-slate-500">• {product.stock}+ cases available</span>
                            </div>

                            {/* Pricing Tiers Table */}
                            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase">Quantity</th>
                                            <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">Price per case</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {product.pricingTiers.map((tier, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-sm text-slate-900">
                                                    {tier.min} - {tier.max || '100+'}
                                                </td>
                                                <td className="px-4 py-2 text-right text-sm font-medium text-primary">
                                                    ₦ {tier.price.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Quantity Selector & Add to Order */}
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <label className="mb-2 block text-sm font-medium text-slate-700">Quantity (Cases)</label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center rounded-lg border border-slate-300 bg-white max-w-[140px]">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="flex h-11 w-11 items-center justify-center text-slate-500 hover:text-primary"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">remove</span>
                                        </button>
                                        <input
                                            className="h-11 w-full border-0 bg-transparent p-0 text-center text-base font-semibold text-slate-900 focus:ring-0"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="flex h-11 w-11 items-center justify-center text-slate-500 hover:text-primary"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">add</span>
                                        </button>
                                    </div>
                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98]">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Distributor Info */}
                        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4 border border-transparent">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-bold">
                                    {product.distributor.initials}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Sold & Fulfilled by</p>
                                    <p className="text-sm font-bold text-slate-900">{product.distributor.name}</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-primary hover:underline">View Profile</button>
                        </div>

                        {/* Quick Specs */}
                        <div className="hidden lg:block rounded-xl border border-slate-200 p-5 bg-white">
                            <h3 className="font-bold text-slate-900 mb-4">Quick Specs</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <dt className="text-slate-500">Unit Volume</dt>
                                    <dd className="font-medium text-slate-900">{product.specs.unitVolume}</dd>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <dt className="text-slate-500">Case Count</dt>
                                    <dd className="font-medium text-slate-900">{product.specs.caseCount}</dd>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-2">
                                    <dt className="text-slate-500">Min Order</dt>
                                    <dd className="font-medium text-slate-900">{product.specs.minOrder}</dd>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <dt className="text-slate-500">Category</dt>
                                    <dd className="font-medium text-primary">{product.category}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
                    <p>© 2023 SalesFunnel Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetail;
