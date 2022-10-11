import dotenv from 'dotenv';
import http from 'http';
import app from './app';
// MongoDB functions to connect and disconnect from database
import mongo from './services/mongo';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// Async to guarantee that the data is loaded before the server starts
const startServer = async () => {
    await mongo.connect();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`);
    });
};

startServer().then(null);
