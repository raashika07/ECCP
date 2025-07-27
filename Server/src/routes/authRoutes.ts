import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
import { body } from 'express-validator';

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], login);
