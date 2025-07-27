"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpControllers_1 = require("../controllers/otpControllers");
const router = express_1.default.Router();
router.post('/process', otpControllers_1.sendOrVerifyOtp); // ✅ unified route
exports.default = router;
