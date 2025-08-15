import { ClubModel } from "../models/club-model";
import fs from "fs/promises";

export const findAllClubs = async (): Promise<ClubModel[]> => {
  const data = await fs.readFile("src\\database\\database-clubs.json", "utf-8");
  const clubs: ClubModel[] = JSON.parse(data);
  return clubs;
};
