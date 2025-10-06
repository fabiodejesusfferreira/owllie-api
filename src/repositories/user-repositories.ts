import { UserModel, IUser } from '../models/user-model';

type UserCreationData = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Cria um novo usuário no banco de dados.
 * @param userData - Os dados do usuário a serem criados.
 * @returns O usuário recém-criado como um objeto simples (lean).
 */
export const createUser = async (userData: UserCreationData): Promise<any> => {
  return UserModel.create(userData);
};

/**
 * Busca um usuário pelo endereço de email.
 * @param email - O email do usuário a ser buscado.
 * @returns O usuário encontrado ou null se não existir.
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email })
};

/**
 * Busca um usuário pelo email, incluindo o campo de senha.
 * @param email - O email do usuário.
 * @returns O usuário com a senha ou null.
 */
export const findUserByEmailWithPassword = async (email: string): Promise<IUser | null> => {
    return UserModel.findOne({ email }).select('+password');
};

