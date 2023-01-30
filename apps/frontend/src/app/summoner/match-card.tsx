import { Component } from 'react';

/* TODO fix match: any */
export class MatchCard extends Component<{ match: any }> {
  render() {
    return (
      <div className="match-card">
        <img className="champion-avatar" src={`/assets/img/champion/${this.props.match.mainParticipant?.championName}.png`} alt={this.props.match.mainParticipant?.championName}></img>
        <div className="match-stat">
          <div>Outcome:</div>
          {this.props.match.mainParticipant.win ? 'victory' : 'defeat'}
        </div>
        <div className="match-stat">
          <div>game duration:</div>
          {Math.floor(this.props.match.info.gameDuration / 60)}:
          {this.props.match.info.gameDuration % 60}
        </div>
        <div className="match-stat">
          <div>champion name:</div>
          {this.props.match.mainParticipant.championName}
        </div>
        <div className="match-stat">
          <div>kda:</div>
          {this.props.match.mainParticipant.kills} / {this.props.match.mainParticipant.deaths} / {this.props.match.mainParticipant.assists}
        </div>
      </div>
    );
  }
}
