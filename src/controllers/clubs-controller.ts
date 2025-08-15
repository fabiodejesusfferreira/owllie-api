import { Request, Response } from "express";
import { getClubsService } from "../services/clubs-service";

export const getClubs = async (req: Request, res: Response) => {
  const response = await getClubsService();
  res.status(response.statusCode).json(response.body);
};
