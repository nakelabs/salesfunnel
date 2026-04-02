import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import productService from '../services/product.service';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getById(id);
                setProduct(data);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError(err.response?.data?.detail || 'Product not found.');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleQuantityChange = (change) => {
        let currentQty = parseInt(quantity, 10) || 0;
        setQuantity(Math.max(1, currentQty + change));
    };

    const handleAddToCart = () => {
        const qtyToAdd = parseInt(quantity, 10) || 0;
        if (product && qtyToAdd > 0) {
            const productId = product.id || product.product_id;
            addToCart({
                ...product,
                id: productId,
                price: product.price_per_case || product.price || 0,
                image: product.image_url || '',
            }, qtyToAdd);
        }
    };

    const formatPrice = (price) => `₦${Number(price).toLocaleString()}`;

    // Derive fields from API response
    const productId = product?.id || product?.product_id;
    const name = product?.name || 'Untitled Product';
    const price = product?.price_per_case || product?.price || 0;
    const stock = product?.stock_quantity ?? product?.stock ?? 0;
    const isAvailable = product?.is_available !== false && stock > 0;
    const imageUrl = product?.image_url || '';
    const category = product?.category || '';
    const sku = product?.sku || '';
    const description = product?.description || product?.full_description || '';
    const brand = product?.brand || '';
    const distributorName = product?.distributor_name || product?.distributor?.name || product?.distributor || '';
    const unitVolume = product?.unit_volume || product?.specs?.unitVolume || '';
    const caseCount = product?.case_count || product?.units_per_case || product?.specs?.caseCount || '';
    const minOrder = product?.min_order_quantity || product?.min_order || product?.specs?.minOrder || '';

    // Loading state
    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <WholesalerNavbar />
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 text-sm">Loading product details…</p>
                </div>
            </div>
        );
    }

    // Error / not found state
    if (error || !product) {
        return (
            <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <WholesalerNavbar />
                <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error_outline</span>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
                    <p className="text-slate-500 mb-6">{error || 'This product could not be loaded.'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Back to Catalog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <WholesalerNavbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
                    <Link to="/dashboard" className="hover:text-primary transition-colors">Catalog</Link>
                    {category && (
                        <>
                            <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                            <span className="hover:text-primary transition-colors">{category}</span>
                        </>
                    )}
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <span className="text-slate-900">{name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column - Image & Tabs */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-slate-200 flex items-center justify-center p-8">
                            {imageUrl ? (
                                <img
                                    alt={name}
                                    className="max-h-full max-w-full object-contain"
                                    src={imageUrl}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-7xl">inventory_2</span>
                                    <p className="mt-2 text-sm">No image available</p>
                                </div>
                            )}
                            {isAvailable && (
                                <div className="absolute top-4 left-4 rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 uppercase tracking-wide">
                                    In Stock
                                </div>
                            )}
                            {!isAvailable && (
                                <div className="absolute top-4 left-4 rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 uppercase tracking-wide">
                                    Out of Stock
                                </div>
                            )}
                        </div>

                        {/* Tabs - Description & Details */}
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
                                            onClick={() => setActiveTab('details')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'details'
                                                ? 'border-primary text-primary'
                                                : 'border-transparent hover:text-slate-600 hover:border-slate-300'
                                                }`}
                                        >
                                            Details
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-slate-200">
                                {activeTab === 'description' && (
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        {description || 'No description available for this product.'}
                                    </p>
                                )}
                                {activeTab === 'details' && (
                                    <dl className="space-y-3">
                                        {sku && (
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <dt className="text-slate-500">SKU</dt>
                                                <dd className="font-medium text-slate-900">{sku}</dd>
                                            </div>
                                        )}
                                        {category && (
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <dt className="text-slate-500">Category</dt>
                                                <dd className="font-medium text-primary">{category}</dd>
                                            </div>
                                        )}
                                        {unitVolume && (
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <dt className="text-slate-500">Unit Volume</dt>
                                                <dd className="font-medium text-slate-900">{unitVolume}</dd>
                                            </div>
                                        )}
                                        {caseCount && (
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <dt className="text-slate-500">Units per Case</dt>
                                                <dd className="font-medium text-slate-900">{caseCount}</dd>
                                            </div>
                                        )}
                                        {brand && (
                                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                                <dt className="text-slate-500">Brand</dt>
                                                <dd className="font-medium text-slate-900">{brand}</dd>
                                            </div>
                                        )}
                                        {distributorName && (
                                            <div className="flex justify-between">
                                                <dt className="text-slate-500">Distributor</dt>
                                                <dd className="font-medium text-slate-900">{distributorName}</dd>
                                            </div>
                                        )}
                                    </dl>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Info & Purchase */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Product Title & Meta */}
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                {name}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                {brand && (
                                    <>
                                        <span className="font-medium text-primary">Brand: {brand}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                    </>
                                )}
                                {sku && <span>SKU: {sku}</span>}
                                {category && (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                        <span>{category}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
                            <div className="bg-slate-50 rounded-lg p-5 flex items-center justify-between border border-slate-100 mb-4">
                                <div className="flex flex-col flex-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Price per Case</span>
                                    <span className="text-3xl font-black text-primary">
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="mt-4 flex items-center gap-3">
                                {isAvailable ? (
                                    <>
                                        <span className="flex size-3 rounded-full bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]"></span>
                                        <span className="text-sm font-medium text-green-700">In Stock</span>
                                        <span className="text-sm text-slate-500">• {stock} cases available</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex size-3 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]"></span>
                                        <span className="text-sm font-medium text-red-700">Out of Stock</span>
                                    </>
                                )}
                            </div>

                            {/* Quantity Selector & Add to Order */}
                            {isAvailable && (
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
                                                value={quantity === 0 ? '' : quantity}
                                                onFocus={() => {
                                                    if (quantity === 1) setQuantity(0);
                                                }}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setQuantity(val === '' ? 0 : Math.max(0, parseInt(val, 10) || 0));
                                                }}
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="flex h-11 w-11 items-center justify-center text-slate-500 hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">add</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98]"
                                        >
                                            <span className="material-symbols-outlined">add_shopping_cart</span>
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Distributor Info */}
                        {distributorName && (
                            <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-bold">
                                        {distributorName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Sold & Fulfilled by</p>
                                        <p className="text-sm font-bold text-slate-900">{distributorName}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Specs (mobile-visible too) */}
                        <div className="rounded-xl border border-slate-200 p-5 bg-white">
                            <h3 className="font-bold text-slate-900 mb-4">Product Info</h3>
                            <dl className="space-y-3 text-sm">
                                {category && (
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <dt className="text-slate-500">Category</dt>
                                        <dd className="font-medium text-primary">{category}</dd>
                                    </div>
                                )}
                                {sku && (
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <dt className="text-slate-500">SKU</dt>
                                        <dd className="font-medium text-slate-900">{sku}</dd>
                                    </div>
                                )}
                                {caseCount && (
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <dt className="text-slate-500">Units per Case</dt>
                                        <dd className="font-medium text-slate-900">{caseCount}</dd>
                                    </div>
                                )}
                                {minOrder && (
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <dt className="text-slate-500">Min Order</dt>
                                        <dd className="font-medium text-slate-900">{minOrder}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between pt-1">
                                    <dt className="text-slate-500">Stock</dt>
                                    <dd className={`font-medium ${stock > 10 ? 'text-green-600' : stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                                        {stock > 0 ? `${stock} available` : 'Out of stock'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
                    <p>© 2025 SalesFunnel Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetail;
