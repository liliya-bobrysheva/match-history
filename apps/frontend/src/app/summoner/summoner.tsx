import { Component } from 'react';
import { MatchCard } from './match-card';
import { ApiService, Match } from '../api-service';

export class Summoner extends Component<{}> {
  service = new ApiService;

  state = {
    summonerName: '',
    matches: [],
    loading: false
  }

  onSummonerNameChange(summonerName: string) {
    this.setState({
      summonerName: '',
      matches: [],
      loading: true
    });

    this.service.getMatchesBySummonerName(summonerName)
      .then((matches: Match[]) => {
        this.setState({ summonerName, matches, loading: false });
      })
  }

  render() {
    return (
      <div>
        <h1>Match history for SummonerName</h1>
        <input
          type="text"
          placeholder="Enter Summoner Name"
          onChange={(e: any) => this.onSummonerNameChange(e.target.value)}/>

        <div>
          {
            this.state.matches
              .map((match: any) =>
                <MatchCard key={match.info.gameId} match={match}/>
              )
          }
        </div>
      </div>
    );
  }
}
