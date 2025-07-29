"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateEmailPassword = void 0;
const validateEmailPassword = (email, password) => {
    if (!email || !password)
        return 'Email and password are required';
    if (!email.includes('@'))
        return 'Invalid email';
    if (password.length < 6)
        return 'Password must be at least 6 characters';
    return null;
};
exports.validateEmailPassword = validateEmailPassword;
const validateEmail = (email) => {
    if (!email)
        return 'Email is required';
    if (!email.includes('@'))
        return 'Invalid email';
    return null;
};
exports.validateEmail = validateEmail;
