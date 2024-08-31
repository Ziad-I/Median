// src/config/db.ts
import mongoose from 'mongoose';
import { ENV } from './env';

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error('Error connecting to MongoDB:', (err as Error).message);
        process.exit(1);
    }
};

export default connectDB;
