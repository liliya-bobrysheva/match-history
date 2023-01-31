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
        <h1 className="text-3xl font-bold underline">{this.state.summonerName ? `Match history for ${this.state.summonerName}` : 'Enter Summoner Name'}</h1>
        <input
          className="my-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
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
