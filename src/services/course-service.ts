import * as courseRepository from '../repositories/course-repositories';
import * as httpHelper from '../utils/http-helper';
import { ICourse } from '../models/course-model';
import { Types } from 'mongoose';

const calculateProgress = (modules: ICourse['modules']): number => {
  let totalLessons = 0;
  let completedLessons = 0;
  if (!modules || modules.length === 0) return 0;

  modules.forEach((module) => {
    if (module.lessons && module.lessons.length > 0) {
      totalLessons += module.lessons.length;
      module.lessons.forEach((lesson) => {
        if (lesson.completed) completedLessons++;
      });
    }
  });

  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
};

export const createCourseService = async (
  courseData: Omit<ICourse, 'userId' | 'createdAt' | 'updatedAt'>,
  userId: string | Types.ObjectId
) => {
  try {
    const progress = calculateProgress(courseData.modules);
    const completed = progress === 100;
    
    const newCourseData = {
      ...courseData,
      progress,
      completed
    };

    const newCourse = await courseRepository.createCourse(newCourseData, userId);
    return httpHelper.created(newCourse);
  } catch (error) {
    return httpHelper.internalServerError();
  }
};

export const getCoursesService = async (userId: string | Types.ObjectId) => {
  try {
    const courses = await courseRepository.findCoursesByUserId(userId);
    return httpHelper.OK(courses);
  } catch (error) {
    return httpHelper.internalServerError();
  }
};

export const updateCourseService = async (
  courseId: string,
  courseData: Partial<ICourse>,
  userId: string | Types.ObjectId
) => {
  try {
    if (courseData.modules) {
      courseData.progress = calculateProgress(courseData.modules);
      courseData.completed = courseData.progress === 100;
    }

    const updatedCourse = await courseRepository.updateCourse(courseId, userId, courseData);
    
    if (!updatedCourse) {
      return httpHelper.badRequest('Curso não encontrado ou não pertence ao usuário.');
    }
    return httpHelper.OK(updatedCourse);
  } catch (error) {
    return httpHelper.internalServerError();
  }
};

export const deleteCourseService = async (
  courseId: string,
  userId: string | Types.ObjectId
) => {
  try {
    const deleted = await courseRepository.deleteCourse(courseId, userId);
    if (!deleted) {
      return httpHelper.badRequest('Curso não encontrado ou não pertence ao usuário.');
    }
    return httpHelper.noContent(); 
  } catch (error) {
    return httpHelper.internalServerError();
  }
};