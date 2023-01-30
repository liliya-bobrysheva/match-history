import { Component } from 'react';
import { MatchCard } from './match-card';
import axios, { AxiosResponse } from 'axios';

export class Summoner extends Component<{}> {
  state = {
    summonerName: '',
    matches: [],
    loading: false
  }

  componentDidMount() {
    axios.get(`http://localhost:3333/api/matches/by-summoner-name/Tokiyami`)
      .then((res: AxiosResponse) => {
        const matches = res.data || [];
        this.setState({ summonerName: 'Tokiyami', matches, loading: false });
      })
  }

  render() {
    return (
      <div>
        <h1>Match history for SummonerName</h1>
        <input
          type="text"
          placeholder="Enter Summoner Name"
          onChange={(e: any) => console.log('summoner name has changed')}/>

        <div>
          <MatchCard />
          <MatchCard />
          <MatchCard />
          <MatchCard />
          {
            this.state.matches
              .map((match: any) =>
                <div key={match.info.gameId}>{match.info.gameId}</div>
              )
          }
        </div>
      </div>
    );
  }
}
