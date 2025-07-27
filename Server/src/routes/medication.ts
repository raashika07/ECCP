import express from 'express';
import { authenticateToken} from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorize';

const router = express.Router();

// Only doctors can view medications
router.get('/medications', authenticateToken, authorizeRoles('doctor'), (req, res) => {
  res.json({ meds: ['Paracetamol', 'Insulin'] });
});
