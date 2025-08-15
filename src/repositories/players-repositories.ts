import { database } from "../database/database-players";
import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return database;
};

export const findPlayerById = async (
  idRequest: number
): Promise<PlayerModel | undefined> => {
  return database.find((player) => player.id === idRequest);
};

export const insertPlayer = async (player: PlayerModel) => {
  let getLastId = database[database.length - 1].id;
  player.id = getLastId + 1;
  database.push(player);
};

export const findAndModifyPlayer = async (
  idRequest: number,
  statistics: StatisticsModel
): Promise<PlayerModel> => {
  const playerIndex = database.findIndex((p) => p.id === idRequest);
  if (playerIndex !== -1) database[playerIndex].statistics = statistics;

  return database[playerIndex]
};

export const deletePlayerById = async (idRequest: number) => {
  const index = database.findIndex((p) => p.id === idRequest);
  if (index !== -1) database.splice(index, 1);
};
