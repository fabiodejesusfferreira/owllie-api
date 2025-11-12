import * as userRepository from "../repositories/user-repositories";
import * as httpHelper from "../utils/http-helper";
import * as authUtils from "../utils/auth-utils";
import { IUser } from "../models/user-model";

type UserRegistrationData = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt" | "password"
> & { password?: string };

export const registerUserService = async (userData: UserRegistrationData) => {
  try {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      return httpHelper.conflict("Este email já está em uso.");
    }

    const hashedPassword = await authUtils.hashPassword(userData.password!);

    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return httpHelper.created({
      message: "Usuário criado com sucesso!",
      user: userResponse,
    });
  } catch (_) {
    return httpHelper.internalServerError();
  }
};

/**
 * Serviço para autenticar um usuário.
 */
export const loginUserService = async (
  credentials: Pick<IUser, "email" | "password">
) => {
  try {
    const user = await userRepository.findUserByEmailWithPassword(
      credentials.email
    );
    if (!user || !user.password) {
      return httpHelper.unauthorized("Email ou senha inválidos.");
    }

    const isPasswordMatch = await authUtils.comparePassword(
      credentials.password!,
      user.password
    );
    if (!isPasswordMatch) {
      return httpHelper.unauthorized("Email ou senha inválidos.");
    }

    const token = authUtils.generateToken(user);

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    return httpHelper.OK({
      message: "Login bem-sucedido!",
      user: userResponse,
      token,
    });
  } catch (_) {
    return httpHelper.internalServerError();
  }
};
