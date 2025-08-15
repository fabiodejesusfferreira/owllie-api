import { findAllClubs } from "../repositories/clubs-repositories";
import * as httpResponse from "../utils/http-helper";

export const getClubsService = async () => {
  const data = await findAllClubs();

  const response = httpResponse.OK(data);
  return response;
};
