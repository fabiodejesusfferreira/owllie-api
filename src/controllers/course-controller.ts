import { Request, Response } from 'express';
import * as courseService from '../services/course-service';
import { badRequest } from '../utils/http-helper';

export const create = async (req: Request, res: Response) => {
  const userId = req.auth!.id; 
  const courseData = req.body;

  if (!courseData.name || !courseData.plataform || !courseData.priority) {
    const response = await badRequest('Campos obrigatórios (name, plataform, priority) não fornecidos.');
    return res.status(response.statusCode).json(response.body);
  }

  const response = await courseService.createCourseService(courseData, userId);
  res.status(response.statusCode).json(response.body);
};

export const getAll = async (req: Request, res: Response) => {
  const userId = req.auth!.id;
  const response = await courseService.getCoursesService(userId);
  res.status(response.statusCode).json(response.body);
};

export const update = async (req: Request, res: Response) => {
  const userId = req.auth!.id;
  const courseId = req.params.id;
  const courseData = req.body;

  const response = await courseService.updateCourseService(courseId, courseData, userId);
  res.status(response.statusCode).json(response.body);
};

export const remove = async (req: Request, res: Response) => {
  const userId = req.auth!.id;
  const courseId = req.params.id;

  const response = await courseService.deleteCourseService(courseId, userId);
  res.status(response.statusCode).json(response.body);
};