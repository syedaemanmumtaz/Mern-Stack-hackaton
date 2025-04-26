import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaDollarSign, FaBox } from 'react-icons/fa';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products'); // Make sure the API endpoint is correct
      setProducts(data.products); // Make sure you're extracting the right data from the response
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Product will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/products/${id}`);
          toast.success('Product Deleted Successfully!');
          fetchProducts();
        } catch (error) {
          toast.error('Failed to delete product');
        }
      }
    });
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${editProduct._id}`, editProduct);
      toast.success('Product Updated Successfully!');
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Admin Dashboard</h1>

      {editProduct && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Edit Product</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              placeholder="Product Price"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="category"
              value={editProduct.category}
              onChange={handleEditChange}
              placeholder="Product Category"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="description"
              value={editProduct.description}
              onChange={handleEditChange}
              placeholder="Product Description"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Update Product
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex flex-col items-center">
                <div className="w-full h-32 bg-gray-200 rounded mb-4">
                  <FaBox className="w-full h-full text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-600">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full flex items-center space-x-1"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full flex items-center space-x-1"
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
