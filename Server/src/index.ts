import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet'; // ✅ Helmet for basic HTTP security
import rateLimit from 'express-rate-limit'; // ✅ Rate limiting
import authRoutes from './routes/authRoutes'; // ✅ Adjust path if needed
import otpRoutes from './routes/otpRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('x-powered-by');

// ✅ Middleware
app.use('/api/otp', otpRoutes);
app.use(cors());
app.use(helmet()); // ✅ Adds security headers
app.use(express.json()); // ✅ Parse JSON bodies

app.use(cors({
  origin: 'http://localhost:3000', // restrict to frontend
  credentials: true
}));

app.use(express.json());
app.use(helmet()); // ✅ Adds security headers

// ✅ Rate Limiting Middleware - limit 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter); // ✅ Use rate limiter globally

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
