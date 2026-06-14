import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';
import productService from '../services/product.service';
import authService from '../services/auth.service';

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const user = authService.getCurrentUser();
    const distributorId = user?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const imageInputRef = useRef(null);

    const handleImageFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImageUploading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            setForm(prev => ({ ...prev, image_url: e.target.result }));
            setImageUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleImageFile(file);
    };

    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '',
        sku: '',
        price_per_case: '',
        stock_quantity: '',
        min_order: '',
        max_order: '',
        image_url: '',
        is_available: true,
    });

    // Fetch product data on mount
    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        if (!distributorId || !productId) {
            setError('Missing product or user information.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            // Try fetching from distributor products first, fall back to product detail
            let product;
            try {
                const products = await distributorService.getDistributorProducts(distributorId);
                const productList = Array.isArray(products) ? products : (products.products || products.data || []);
                product = productList.find(p => String(p.id || p.product_id) === String(productId));
            } catch (e) {
                console.warn('Could not fetch from distributor products, trying product detail API:', e);
            }

            if (!product) {
                const data = await productService.getById(productId);
                product = data.product || data;
            }

            if (!product) {
                setError('Product not found.');
                return;
            }

            setForm({
                name: product.name || product.product_name || '',
                description: product.description || '',
                category: product.category || '',
                sku: product.sku || '',
                price_per_case: product.price_per_case || '',
                stock_quantity: product.stock_quantity ?? '',
                min_order: product.min_order || product.min_order_quantity || '',
                max_order: product.max_order || product.max_order_quantity || '',
                image_url: product.image_url || '',
                is_available: product.is_available !== undefined ? product.is_available : true,
            });
        } catch (err) {
            console.error('Failed to fetch product:', err);
            setError(err.response?.data?.detail || 'Failed to load product details.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!distributorId || !productId) return;

        try {
            setSaving(true);
            setError(null);
            setSuccess(false);

            // Build the payload — only send non-empty fields
            const payload = {};
            Object.entries(form).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    // Convert numeric fields
                    if (['price_per_case', 'stock_quantity', 'min_order', 'max_order'].includes(key)) {
                        payload[key] = Number(value);
                    } else if (key === 'is_available') {
                        payload[key] = Boolean(value);
                    } else {
                        payload[key] = value;
                    }
                }
            });

            await distributorService.updateDistributorProduct(distributorId, productId, payload);
            setSuccess(true);
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Failed to update product:', err);
            setError(err.response?.data?.detail || 'Failed to update product. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <DistributorNavbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center text-sm font-medium text-slate-500">
                    <Link to="/distributor-dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <Link to="/inventory" className="hover:text-primary transition-colors">Inventory</Link>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                    <span className="text-slate-900">Edit Product</span>
                </nav>

                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
                        <p className="text-sm text-slate-500 mt-1">Update your product information and pricing</p>
                    </div>
                    <button
                        onClick={() => navigate('/inventory')}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back
                    </button>
                </div>

                {/* Success Banner */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-[fadeIn_0.3s_ease-in]">
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                        <p className="text-sm text-green-700 font-medium flex-1">Product updated successfully!</p>
                        <button
                            onClick={() => navigate('/inventory')}
                            className="text-sm font-semibold text-green-600 hover:text-green-800"
                        >
                            Go to Inventory
                        </button>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                        <button onClick={() => setError(null)} className="text-sm font-semibold text-red-600 hover:text-red-800">
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 text-sm">Loading product details...</p>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Basic Information</h2>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Product Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={form.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors resize-none"
                                        placeholder="Product description"
                                    />
                                </div>

                                {/* Category & SKU */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                            Category
                                        </label>
                                        <input
                                            id="category"
                                            name="category"
                                            type="text"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                            placeholder="e.g. Beverages"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="sku" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                            SKU
                                        </label>
                                        <input
                                            id="sku"
                                            name="sku"
                                            type="text"
                                            value={form.sku}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                            placeholder="e.g. BEV-001"
                                        />
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Availability
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => { setForm(prev => ({ ...prev, is_available: !prev.is_available })); setSuccess(false); }}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.is_available ? 'bg-green-500' : 'bg-slate-300'
                                                }`}
                                        >
                                            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${form.is_available ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                        </button>
                                        <span className={`text-sm font-medium ${form.is_available ? 'text-green-700' : 'text-slate-500'}`}>
                                            {form.is_available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pricing & Stock</h2>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Price per Case */}
                                <div>
                                    <label htmlFor="price_per_case" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Price per Case (₦) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₦</span>
                                        <input
                                            id="price_per_case"
                                            name="price_per_case"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            required
                                            value={form.price_per_case}
                                            onChange={handleChange}
                                            className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Stock Quantity */}
                                <div>
                                    <label htmlFor="stock_quantity" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="stock_quantity"
                                        name="stock_quantity"
                                        type="number"
                                        min="0"
                                        required
                                        value={form.stock_quantity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                        placeholder="e.g. 500"
                                    />
                                </div>

                                {/* Min / Max Order */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="min_order" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                            Minimum Order Quantity
                                        </label>
                                        <input
                                            id="min_order"
                                            name="min_order"
                                            type="number"
                                            min="0"
                                            value={form.min_order}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                            placeholder="e.g. 10"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="max_order" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                            Maximum Order Quantity
                                        </label>
                                        <input
                                            id="max_order"
                                            name="max_order"
                                            type="number"
                                            min="0"
                                            value={form.max_order}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                            placeholder="e.g. 1000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Product Image</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Upload zone */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
                                    {form.image_url ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={form.image_url}
                                                alt="Product preview"
                                                className="w-40 h-40 object-cover rounded-xl border border-slate-200 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setForm(prev => ({ ...prev, image_url: '' }))}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                                                title="Remove image"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => imageInputRef.current?.click()}
                                                className="mt-2 flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">edit</span>
                                                Change photo
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onDrop={handleImageDrop}
                                            onClick={() => imageInputRef.current?.click()}
                                            className={`flex flex-col items-center justify-center gap-2 w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                                                dragOver ? 'border-primary bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-primary hover:bg-blue-50/50'
                                            }`}
                                        >
                                            {imageUploading ? (
                                                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-4xl text-slate-300">add_photo_alternate</span>
                                                    <p className="text-sm font-medium text-slate-500">Click or drag &amp; drop an image</p>
                                                    <p className="text-xs text-slate-400">PNG, JPG, WEBP up to 5MB</p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageFile(e.target.files[0])}
                                    />
                                </div>

                                {/* URL fallback */}
                                <div>
                                    <label htmlFor="image_url" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Or paste an image URL
                                    </label>
                                    <input
                                        id="image_url"
                                        name="image_url"
                                        type="url"
                                        value={form.image_url.startsWith('data:') ? '' : form.image_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-colors"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex items-center justify-between gap-4 pt-2 pb-8">
                            <button
                                type="button"
                                onClick={() => navigate('/inventory')}
                                className="px-6 py-3 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">save</span>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
};

export default EditProductPage;
