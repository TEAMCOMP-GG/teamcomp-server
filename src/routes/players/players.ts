import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { paramMissingError, IRequest } from '@shared/constants';
import { IPlayers } from '@entities/players';
import { getPlayerByName } from '../../riot';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const scoutPlayers = async (
  req: Request,
  res: Response,
): Promise<Response<any>> => {
  const players: IPlayers = req.body;
  const allies = await Promise.all(
    players.allies.map(async player => {
      const { data } = await getPlayerByName(player);
      return {
        allignment: 'ally',
        ...data,
      };
    }),
  );
  const enemies = await Promise.all(
    players.enemies.map(async player => {
      const { data } = await getPlayerByName(player);
      return {
        allignment: 'enemy',
        ...data,
      };
    }),
  );
  const scoutedPlayers = [...allies, ...enemies];

  return res.status(OK).json(scoutedPlayers);
};
export const addPlayer = async (
  req: IRequest,
  res: Response,
): Promise<void | Response<any>> => {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  return res.status(CREATED).end();
};
