import { format } from 'util';
import { Request, default as fetch } from 'node-fetch';
import { RIOT_TOKEN } from '../../config.json';

interface Response<T> {
  data: T;
  etag: string | null;
}
class RiotClient {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  async fetch<T = unknown>(
    host: string,
    path: string,
    ...params: string[]
  ): Promise<Response<T>> {
    const pathWithParams = format(path, ...params.map(encodeURIComponent));
    const uri = new URL(pathWithParams, host);
    const request = new Request(uri.href, {
      method: 'GET',
      headers: [
        ['X-Riot-Token', this.#token],
        ['Accept', 'application/json'],
      ],
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${uri.href}`);
    }
    return {
      data: (await response.json()) as T,
      etag: response.headers.get('etag'),
    };
  }
}
export const client = new RiotClient(RIOT_TOKEN);

export async function getPlayerByName(
  client: RiotClient,
  host: string,
  playerName: string,
): Promise<any> {
  const uri = 'lol/summoner/v4/summoners/by-name/%s';
  return client.fetch(host, uri, playerName);
}
export const getPlayerMastery = async (
  client: RiotClient,
  host: string,
  summonerId: string,
): Promise<{ data: any; etag: any }> => {
  const uri = 'lol/champion-mastery/v4/champion-masteries/by-summoner/%s';
  return client.fetch(host, uri, summonerId);
};
