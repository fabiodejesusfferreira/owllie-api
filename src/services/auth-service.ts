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
    // 1. Verifica se o email já está em uso.
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      return httpHelper.conflict("Este email já está em uso.");
    }

    // 2. Criptografa a senha usando a função pura.
    const hashedPassword = await authUtils.hashPassword(userData.password!);

    // 3. Cria o novo usuário no banco de dados com a senha já criptografada.
    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

    // 4. Prepara a resposta, garantindo que a senha não seja exposta.
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
    // 1. Busca o usuário pelo email, incluindo a senha na consulta.
    const user = await userRepository.findUserByEmailWithPassword(
      credentials.email
    );
    if (!user || !user.password) {
      return httpHelper.unauthorized("Email ou senha inválidos.");
    }

    // 2. Compara a senha fornecida com a armazenada usando a função pura.
    const isPasswordMatch = await authUtils.comparePassword(
      credentials.password!,
      user.password
    );
    if (!isPasswordMatch) {
      return httpHelper.unauthorized("Email ou senha inválidos.");
    }

    // 3. Gera um token JWT para o usuário autenticado.
    const token = authUtils.generateToken(user);

    // 4. Prepara a resposta, removendo a senha do objeto do usuário.
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
