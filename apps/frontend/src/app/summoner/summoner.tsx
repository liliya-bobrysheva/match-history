import { Component } from 'react';
import { MatchCard } from './match-card';

export class Summoner extends Component<{}> {
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
        </div>
      </div>
    );
  }
}
