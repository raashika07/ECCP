"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator"); // ✅ NEW IMPORT
// ✅ Email Format Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ✅ REGISTER CONTROLLER
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req); // ✅ VALIDATION CHECK
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, role } = req.body;
    console.log('📥 Register request:', { email });
    // ✅ Field presence check
    if (!email || !password || !role) {
        console.log('❌ Missing email, password or role');
        return res.status(400).json({ message: 'All fields required' });
    }
    // ✅ Email format check
    if (!emailRegex.test(email)) {
        console.log('❌ Invalid email format');
        return res.status(400).json({ message: 'Invalid email format' });
    }
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            console.log('⚠️ User already exists:', email);
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ email, password: hashedPassword, role });
        yield newUser.save();
        console.log('✅ New user registered:', email);
        return res.status(201).json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('❌ Register error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.register = register;
// ✅ LOGIN CONTROLLER
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req); // ✅ VALIDATION CHECK
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log('📥 Login request:', { email });
    if (!email || !password) {
        console.log('❌ Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // ✅ Email format check
    if (!emailRegex.test(email)) {
        console.log('❌ Invalid email format');
        return res.status(400).json({ message: 'Invalid email format' });
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            console.log('❌ Invalid email:', email);
            return res.status(404).json({ message: 'Invalid email' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('❌ Invalid password for:', email);
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('✅ Login successful for:', email);
        return res.status(200).json({ message: 'Login successful', token, role: user.role }); // ✅ Send role too
    }
    catch (error) {
        console.error('❌ Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.login = login;
