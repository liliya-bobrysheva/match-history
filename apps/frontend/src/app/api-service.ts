import axios, { AxiosResponse } from 'axios';
import { RiotAPITypes } from '@fightmegg/riot-api';

export interface Match extends RiotAPITypes.MatchV5.MatchDTO {
  mainParticipant: RiotAPITypes.MatchV5.ParticipantDTO;
}

/* TODO handle http errors here */
export class ApiService {
  apiUrl = 'http://localhost:3333/api';

  async getMatchesBySummonerName(name: string, count = 5): Promise<Match[]> {
    return axios.get(`${this.apiUrl}/matches/by-summoner-name/${name}`)
      .then((res: AxiosResponse) => {
        if (res.status !== 200) {
          /* TODO handle error properly */
          console.log('cant retrieve matches from API')
        }

        const matches = res.data || [];
        return matches;
      });
  }
}
