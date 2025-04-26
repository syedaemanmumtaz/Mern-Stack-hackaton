import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/products', formData);
      toast.success('Product Created Successfully 🎉');
      setFormData({ name: '', price: '', category: '', description: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="price" placeholder="Product Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
