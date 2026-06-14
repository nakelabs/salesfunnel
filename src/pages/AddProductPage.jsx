import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';
import authService from '../services/auth.service';

const AddProductPage = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const distributorId = user?.id;

    const [form, setForm] = useState({
        name: '',
        description: '',
        price_per_case: '',
        stock_quantity: '',
        category: '',
        image_url: '',
        is_available: true,
        sku: '',
    });

    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!distributorId) {
            setError('User not found. Please login again.');
            return;
        }

        if (!form.name.trim()) {
            setError('Product name is required.');
            return;
        }

        if (!form.price_per_case || Number(form.price_per_case) <= 0) {
            setError('Price per case must be greater than 0.');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
                price_per_case: Number(form.price_per_case),
                stock_quantity: Number(form.stock_quantity) || 0,
                category: form.category.trim(),
                image_url: form.image_url.trim(),
                is_available: form.is_available,
                sku: form.sku.trim(),
            };

            // Remove empty optional fields
            Object.keys(payload).forEach(key => {
                if (payload[key] === '' || payload[key] === undefined) {
                    delete payload[key];
                }
            });

            await distributorService.addProductToCatalog(distributorId, payload);
            setSuccess(true);

            // Redirect to inventory after a short delay
            setTimeout(() => navigate('/inventory'), 1500);
        } catch (err) {
            console.error('Failed to add product:', err);
            setError(err.response?.data?.detail || 'Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <DistributorNavbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back link */}
                <button
                    onClick={() => navigate('/inventory')}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Inventory
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Add New Product</h2>
                    <p className="text-sm text-slate-500 mt-1">Add a new product to your distributor catalog</p>
                </div>

                {/* Success Banner */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600">check_circle</span>
                        <p className="text-sm text-green-700 font-medium">Product added successfully! Redirecting to inventory…</p>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Basic Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Premium Cooking Oil"
                                    required
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of the product…"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                                        Category
                                    </label>
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Beverages"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">
                                        SKU
                                    </label>
                                    <input
                                        id="sku"
                                        name="sku"
                                        type="text"
                                        value={form.sku}
                                        onChange={handleChange}
                                        placeholder="e.g. PRD-001"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Pricing & Stock</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price_per_case" className="block text-sm font-medium text-slate-700 mb-1">
                                    Price per Case (₦) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="price_per_case"
                                    name="price_per_case"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={form.price_per_case}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    required
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="stock_quantity" className="block text-sm font-medium text-slate-700 mb-1">
                                    Stock Quantity
                                </label>
                                <input
                                    id="stock_quantity"
                                    name="stock_quantity"
                                    type="number"
                                    min="0"
                                    value={form.stock_quantity}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image & Availability */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Image & Availability</h3>

                        <div className="space-y-4">
                            {/* Upload zone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
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
                                                <p className="text-sm font-medium text-slate-500">Click or drag & drop an image</p>
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
                                <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 mb-1">
                                    Or paste an image URL
                                </label>
                                <input
                                    id="image_url"
                                    name="image_url"
                                    type="url"
                                    value={form.image_url.startsWith('data:') ? '' : form.image_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com/product-image.jpg"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Available for Purchase</p>
                                    <p className="text-xs text-slate-500 mt-0.5">When enabled, wholesalers can order this product</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_available"
                                        checked={form.is_available}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/20 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/inventory')}
                            className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Adding…
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-base">add</span>
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddProductPage;
