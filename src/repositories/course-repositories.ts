import { CourseModel, ICourse } from '../models/course-model';
import { Types } from 'mongoose';

type CourseCreationData = Omit<ICourse, 'userId' | 'progress' | 'completed' | 'createdAt' | 'updatedAt'>;
type CourseUpdateData = Partial<CourseCreationData>;

export const createCourse = async (
  courseData: CourseCreationData,
  userId: string | Types.ObjectId
): Promise<ICourse> => {
  return CourseModel.create({
    ...courseData,
    userId: userId,
  });
};

export const findCoursesByUserId = async (
  userId: string | Types.ObjectId
): Promise<ICourse[]> => {
  return CourseModel.find({ userId: userId }).sort({ createdAt: -1 });
};

export const updateCourse = async (
  courseId: string,
  userId: string | Types.ObjectId,
  updates: CourseUpdateData
): Promise<ICourse | null> => {
  return CourseModel.findOneAndUpdate(
    { _id: courseId, userId: userId },
    { $set: updates },
    { new: true }
  );
};

export const deleteCourse = async (
  courseId: string,
  userId: string | Types.ObjectId
): Promise<ICourse | null> => {
  return CourseModel.findOneAndDelete({ _id: courseId, userId: userId });
};