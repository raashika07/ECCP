import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import OTPModel from '../models/OTP';

// 🔐 Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📧 Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// ✅ COMBINED CONTROLLER
export const sendOrVerifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  // 🛡️ Validation
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // ✅ Step 2: Send OTP
  if (!otp) {
    const newOtp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 mins

    await OTPModel.findOneAndUpdate(
      { email },
      { otp: newOtp, expiresAt: expiry },
      { upsert: true }
    );

    const mailOptions = {
      from: 'ECCP <your_email@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      html: `<h3>Your OTP is: <strong>${newOtp}</strong></h3>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('❌ Email error:', error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
  }

  // ✅ Step 3: Verify OTP
  const record = await OTPModel.findOne({ email });
  if (!record) return res.status(404).json({ message: 'No OTP found for this email' });

  if (record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const now = new Date();
  if (record.expiresAt < now) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  await OTPModel.deleteOne({ email }); // 🔐 Invalidate OTP after successful verification
  return res.status(200).json({ message: 'OTP verified successfully' });
};
export default sendOrVerifyOtp;  