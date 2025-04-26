import React from 'react';
import './index.css';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <AdminDashboard/>
      <AddProduct />
      <ProductList />
      <ToastContainer />
    </div>
  );
}; 

export default App;

