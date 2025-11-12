import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user-model'; 
const LessonSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: false });

const ModuleSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  lessons: [LessonSchema],
}, { _id: false });

export interface ICourse extends Document {
  name: string;
  plataform: string;
  priority: 'high' | 'medium' | 'low' | '';
  progress: number;
  completed: boolean;
  modules: {
    name: string;
    completed: boolean;
    lessons: { name: string; completed: boolean }[];
  }[];
  userId: Types.ObjectId | IUser;
}

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  plataform: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low', ''], required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  modules: [ModuleSchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
});

export const CourseModel = model<ICourse>('Course', CourseSchema);