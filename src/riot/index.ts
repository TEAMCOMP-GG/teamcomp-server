import { Request, default as fetch } from 'node-fetch';
import { RIOT_TOKEN } from '../../config.json';

export const getPlayerByName = async (
  name: string,
): Promise<{ data: any; etag: any }> => {
  const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
  const request = new Request(url, {
    method: 'GET',
    headers: [['X-Riot-Token', RIOT_TOKEN]],
  });
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${url}`);
  }
  return {
    data: await response.json(),
    etag: response.headers.get('etag'),
  };
};
