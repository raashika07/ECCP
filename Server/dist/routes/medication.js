"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const authorize_1 = require("../middleware/authorize");
const router = express_1.default.Router();
// Only doctors can view medications
router.get('/medications', authMiddleware_1.authenticateToken, (0, authorize_1.authorizeRoles)('doctor'), (req, res) => {
    res.json({ meds: ['Paracetamol', 'Insulin'] });
});
