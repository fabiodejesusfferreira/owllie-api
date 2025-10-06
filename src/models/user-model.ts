import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'O nome completo é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    select: false, // Impede que a senha seja retornada em consultas por padrão.
  },
}, {
  timestamps: true,
});

export const UserModel = model<IUser>('User', UserSchema);

