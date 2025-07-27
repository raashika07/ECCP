import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validationResult } from 'express-validator'; // ✅ NEW IMPORT

// ✅ Email Format Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ REGISTER CONTROLLER
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req); // ✅ VALIDATION CHECK
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ User already exists:', email);
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });

    await newUser.save();
    console.log('✅ New user registered:', email);

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('❌ Register error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ✅ LOGIN CONTROLLER
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req); // ✅ VALIDATION CHECK
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
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Invalid email:', email);
      return res.status(404).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful for:', email);
    return res.status(200).json({ message: 'Login successful', token, role: user.role }); // ✅ Send role too
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
