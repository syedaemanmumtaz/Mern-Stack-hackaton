// import Product from '../models/productModel.js';
// import chalk from 'chalk';

// // Create Product
// export const createProduct = async (req, res, next) => {
//     try {
//         const product = await Product.create(req.body);
//         console.log(chalk.green.bold('✅ Product created successfully'));
//         res.status(201).json({ success: true, product });
//     } catch (error) {
//         if (error.code === 11000) {
//             error.message = 'Product name must be unique';
//             error.statusCode = 400;
//         }
//         next(error);
//     }
// };

// // Get All Products
// export const getAllProducts = async (req, res, next) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         next(error);
//     }
// };

// // Update Product
// export const updateProduct = async (req, res, next) => {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ success: true, product });
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete Product
// export const deleteProduct = async (req, res, next) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ success: true, message: 'Product Deleted Successfully' });
//     } catch (error) {
//         next(error);
//     }
// };
