import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import menuRoutes from './routes/menuRoutes';
import { errorHandler } from './middlewares/errorHandler';
const cors = require('cors');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:3010', // Update this to your Next.js frontend's URL or use environment variable for dynamic URL
  optionsSuccessStatus: 200,
};

// Apply CORS middleware before routes and other middleware
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Base route for Menu
app.use('/api', menuRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
