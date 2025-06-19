export const validateEmailPassword = (email: string, password: string): string | null => {
  if (!email || !password) return 'Email and password are required';
  if (!email.includes('@')) return 'Invalid email';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Invalid email';
  return null;
};
