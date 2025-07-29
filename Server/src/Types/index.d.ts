import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { role: string; userId: string };
    }
  }
}
export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}