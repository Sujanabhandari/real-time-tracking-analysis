import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);

// Wrap the code in an async function
async function connectDb() {
    try {
        const client = await mongoose.connect(
            process.env.DATABASE_CONNECTION_URL
        );
        console.log(`Connected to MongoDB @ ${client.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

connectDb();
