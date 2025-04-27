// backend/config/db.js
import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      chalk.bgGreen.black(`✅ MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(
      chalk.bgRed.white(`❌ MongoDB Connection Failed: ${error.message}`)
    );
    process.exit(1);
  }
};

export default connectDB;
