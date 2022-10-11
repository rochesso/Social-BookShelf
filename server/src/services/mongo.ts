import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
    console.error(err);
});

async function connect() {
    if (MONGO_URL != null) {
        await mongoose.connect(MONGO_URL);
    }

}

async function disconnect() {
    await mongoose.disconnect();
}

export default { connect, disconnect};
