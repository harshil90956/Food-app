import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        // Connect to MongoDB without deprecated options
        await mongoose.connect(mongoUri);

        console.log('DB connected');
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
        process.exit(1); // Exit the process if there's a connection error
    }
};
