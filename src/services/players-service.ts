import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";
import * as PlayerRepository from "../repositories/players-repositories";
import * as httpResponse from "../utils/http-helper";

export const getPlayerService = async () => {
  const data = await PlayerRepository.findAllPlayers();
  let response = null;

  data
    ? (response = await httpResponse.OK(data))
    : (response = await httpResponse.noContent());

  return response;
};

export const getPlayerByIdService = async (id: number) => {
  const data = await PlayerRepository.findPlayerById(id);
  let response = null;

  data
    ? (response = await httpResponse.OK(data))
    : (response = await httpResponse.noContent());

  return response;
};

export const postPlayerService = async (player: PlayerModel) => {
  let response = null;
  if (!player) response = httpResponse.badRequest();
  else {
    await PlayerRepository.insertPlayer(player);
    response = httpResponse.created();
  }

  return response;
};

export const updatePlayerService = async (
  id: number,
  statistics: StatisticsModel
) => {
  let response = null;
  if (!id) return (response = httpResponse.badRequest());
  else {
    const data = await PlayerRepository.findAndModifyPlayer(id, statistics);
    if (!Object.keys(data)) response = await httpResponse.badRequest();
    response = await httpResponse.OK(data);
  }

  return response;
};

export const deletePlayerService = async (id: number) => {
  let response = null;
  if (!id) return (response = httpResponse.badRequest());
  else {
    await PlayerRepository.deletePlayerById(id);
    response = httpResponse.OK({ message: "Successfully deleted" });
  }

  return response;
};
