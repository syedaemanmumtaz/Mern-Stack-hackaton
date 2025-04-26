// backend/config/dbConnect.js

import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(chalk.white.bold.bgGreen(`✅ MongoDB Connected: ${connection.host}`));
  } catch (error) {
    console.error(chalk.white.bold.bgRed(`❌ MongoDB Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;

