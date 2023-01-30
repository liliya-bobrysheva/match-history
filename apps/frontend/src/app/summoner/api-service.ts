import axios from 'axios';

/* TODO fix any, return matches, handle http errors here */
export class ApiService {
  apiUrl = 'http://localhost:3333/api';

  async getMatchesBySummonerName(name: string, count = 5): Promise<any[]> {
    return axios.get(`${this.apiUrl}/matches/by-summoner-name/${name}`);
  }
}
