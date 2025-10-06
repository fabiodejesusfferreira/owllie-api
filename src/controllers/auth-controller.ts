import { Request, Response } from 'express';
import * as authService from '../services/auth-service';
import { badRequest } from '../utils/http-helper';
import { IUser } from '../models/user-model';

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body as IUser;

  if (!fullName || !email || !password) {
    const response = await badRequest('Todos os campos são obrigatórios.');
    return res.status(response.statusCode).json(response.body);
  }

  const response = await authService.registerUserService({ fullName, email, password } as IUser);
  
  res.status(response.statusCode).json(response.body);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const response = await badRequest('Email e senha são obrigatórios.');
    return res.status(response.statusCode).json(response.body);
  }
  
  const response = await authService.loginUserService({ email, password });

  res.status(response.statusCode).json(response.body);
};
