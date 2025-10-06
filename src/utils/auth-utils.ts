import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user-model';

/**
 * Função pura para criptografar uma senha.
 * @param password A senha em texto plano.
 * @returns A senha criptografada.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Função pura para comparar uma senha em texto plano com uma senha criptografada.
 * @param plainPassword A senha fornecida pelo usuário.
 * @param hashedPassword A senha armazenada no banco de dados.
 * @returns `true` se as senhas corresponderem, `false` caso contrário.
 */
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Função pura para gerar um token JWT.
 * @param user O objeto do usuário para o qual o token será gerado.
 * @returns O token JWT assinado.
 */
export const generateToken = (user: IUser): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida.');
  }

  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, jwtSecret, { expiresIn: '30d' });
};
