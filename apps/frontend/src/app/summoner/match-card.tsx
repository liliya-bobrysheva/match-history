import { Component } from 'react';

/* TODO fix match: any */
export class MatchCard extends Component<{ match: any }> {
  render() {
    return (
      <div className="match-card flex flex-col items-center bg-white border border-gray-200 rounded-lg my-3 shadow md:flex-row md:max-w-xl hover:bg-gray-100">
      <img className="champion-avatar object-cover max-w-16 max-h-16" src={`/assets/img/champion/${this.props.match.mainParticipant?.championName}.png`} alt=""></img>
      <div  className="match-stat">
        <div className="font-bold">Outcome:</div>
        {this.props.match.mainParticipant.win ? 'victory' : 'defeat'}
      </div>
      <div>
        <div className="font-bold">game duration:</div>
        {Math.floor(this.props.match.info.gameDuration / 60)}:
        {this.props.match.info.gameDuration % 60}
      </div>
      <div>
        <div className="font-bold">champion name:</div>
        {this.props.match.mainParticipant?.championName}
      </div>
      <div>
        <div className="font-bold">kda:</div>
        {this.props.match.mainParticipant.kills} /{' '}
        {this.props.match.mainParticipant.deaths} /{' '}
        {this.props.match.mainParticipant.assists}
      </div>
    </div>
    );
  }
}
