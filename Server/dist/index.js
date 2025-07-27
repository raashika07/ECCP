"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet")); // ✅ Helmet for basic HTTP security
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); // ✅ Rate limiting
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // ✅ Adjust path if needed
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.disable('x-powered-by');
// ✅ Middleware
app.use('/api/otp', otpRoutes_1.default);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)()); // ✅ Adds security headers
app.use(express_1.default.json()); // ✅ Parse JSON bodies
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // restrict to frontend
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)()); // ✅ Adds security headers
// ✅ Rate Limiting Middleware - limit 100 requests per 15 min per IP
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter); // ✅ Use rate limiter globally
// ✅ Routes
app.use('/api/auth', authRoutes_1.default);
// ✅ MongoDB connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
});
