import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Product } from '../../types/company';
import apiClient from '@/services/apiClient';

const defaultProducts: Product[] = [];

const ProductForm = ({
    formData,
    setFormData,
    handleSubmit,
    cancelForm,
    isEditing
}: {
    formData: Omit<Product, 'id'>;
    setFormData: React.Dispatch<React.SetStateAction<Omit<Product, 'id'>>>;
    handleSubmit: () => void;
    cancelForm: () => void;
    isEditing: boolean;
}) => (
    <div className=" p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-4">
            {isEditing ? 'Edit Product' : 'Add New Product'}
        </h3>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Product Name</label>
                <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-[#272729] text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Hourly Rate ($)</label>
                <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md bg-[#272729] border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Minimum Time</label>
                <select
                    value={formData.minimumTime}
                    onChange={(e) => setFormData({ ...formData, minimumTime: e.target.value as Product['minimumTime'] })}
                    className="mt-1 p-2 bg-[#272729] block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="15min">15 Minutes</option>
                    <option value="30min">30 Minutes</option>
                    <option value="1hour">1 Hour</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={cancelForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-slate-700"
                >
                    {isEditing ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </div>
    </div>
);

export function ProductManagement() {
    const [products, setProducts] = useState<Product[]>(defaultProducts);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        description: '',
        hourlyRate: 0,
        minimumTime: '1hour'
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmitProduct = async () => {
        try {
            if (editingProduct) {
                const response = await apiClient.put(`products/${editingProduct._id}`, formData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingProduct._id ? response.data : product
                    )
                );
            } else {
                const response = await apiClient.post('products/', formData);
                setProducts((prevProducts) => [...prevProducts, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const resetForm = () => {
        setIsAddingProduct(false);
        setEditingProduct(null);
        setFormData({ name: '', description: '', hourlyRate: 0, minimumTime: '1hour' });
    };


    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            hourlyRate: product.hourlyRate,
            minimumTime: product.minimumTime
        });
    };

    const handleDeleteProduct = async (_id: string) => {
        try {
            await apiClient.delete(`products/${_id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== _id));
        }
        catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div className="bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products & Services</h2>
                {!isAddingProduct && !editingProduct && (
                    <button onClick={() => setIsAddingProduct(true)}
                        className="px-8 mt-6 py-2 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                        <span className="relative z-20 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            <span>Add Product</span>
                        </span>
                    </button>
                )}
            </div>

            {(isAddingProduct || editingProduct) && (
                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmitProduct}
                    cancelForm={resetForm}
                    isEditing={!!editingProduct}
                />
            )}

            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600 mt-1">{product.description}</p>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm text-gray-900">Rate: ${product.hourlyRate}/hour</p>
                                    <p className="text-sm text-gray-900">Minimum time: {product.minimumTime}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id as string)}
                                    className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}