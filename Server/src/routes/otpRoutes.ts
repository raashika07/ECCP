import express from 'express';
import { sendOrVerifyOtp } from '../controllers/otpControllers';

const router = express.Router();

router.post('/process', sendOrVerifyOtp); // ✅ unified route

export default router;
