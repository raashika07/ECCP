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
exports.sendOrVerifyOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const OTP_1 = __importDefault(require("../models/OTP"));
// 🔐 Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
// 📧 Configure nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password
    },
});
// ✅ COMBINED CONTROLLER
const sendOrVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    // 🛡️ Validation
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    // ✅ Step 2: Send OTP
    if (!otp) {
        const newOtp = generateOTP();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins
        yield OTP_1.default.findOneAndUpdate({ email }, { otp: newOtp, expiresAt: expiry }, { upsert: true });
        const mailOptions = {
            from: 'ECCP <your_email@gmail.com>',
            to: email,
            subject: 'Your OTP Code',
            html: `<h3>Your OTP is: <strong>${newOtp}</strong></h3>`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'OTP sent successfully' });
        }
        catch (error) {
            console.error('❌ Email error:', error);
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
    }
    // ✅ Step 3: Verify OTP
    const record = yield OTP_1.default.findOne({ email });
    if (!record)
        return res.status(404).json({ message: 'No OTP found for this email' });
    if (record.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    const now = new Date();
    if (record.expiresAt < now) {
        return res.status(400).json({ message: 'OTP expired' });
    }
    yield OTP_1.default.deleteOne({ email }); // 🔐 Invalidate OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully' });
});
exports.sendOrVerifyOtp = sendOrVerifyOtp;
exports.default = exports.sendOrVerifyOtp;
