import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../utils/http-helper';

declare global {
  namespace Express {
    interface Request {
      auth?: { id: string; email: string };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const response = await unauthorized('Token de autenticação não fornecido.');
    return res.status(response.statusCode).json(response.body);
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida.');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string };
    
    req.auth = decoded;
    
    next();
  } catch (error) {
    const response = await unauthorized('Token inválido ou expirado.');
    return res.status(response.statusCode).json(response.body);
  }
};