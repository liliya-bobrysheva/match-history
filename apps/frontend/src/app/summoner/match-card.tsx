import { Component } from 'react';

/* TODO fix match: any */
export class MatchCard extends Component<{ match: any }> {
  render() {
    return (
      <div className="match-card">
        <div className="match-stat">
          <div>Outcome:</div>
          {this.props.match.info.participants[0].win ? 'victory' : 'defeat'}
        </div>
        <div className="match-stat">
          <div>game duration:</div>
          {Math.floor(this.props.match.info.gameDuration / 60)}:
          {this.props.match.info.gameDuration % 60}
        </div>
        <div className="match-stat">
          <div>champion name:</div>
          {this.props.match.info.participants[0].championName}
        </div>
        <div className="match-stat">
          <div>kda:</div>
          {this.props.match.info.participants[0].kills} / {this.props.match.info.participants[0].deaths} / {this.props.match.info.participants[0].assists}
        </div>
      </div>
    );
  }
}
