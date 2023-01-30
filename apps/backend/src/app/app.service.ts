import { Injectable } from '@nestjs/common';
import { Observable, from, mergeMap, forkJoin, tap, map } from 'rxjs';
import { RiotAPI, PlatformId, RiotAPITypes } from '@fightmegg/riot-api';

export interface Match extends RiotAPITypes.MatchV5.MatchDTO {
  mainParticipant: RiotAPITypes.MatchV5.ParticipantDTO;
}

@Injectable()
export class AppService {
  api: RiotAPI;

  constructor() {
    this.api = new RiotAPI(
      "RGAPI-a567455f-c201-4b60-a849-aa5e3d97a384" // TODO fix exposed key
    );
  }

  // TODO fix API key exposed in codebase
  // TODO separate method for each api request
  getMatchesBySummonerName(summonerName: string, count = 5): Observable<Match[]> {
    const region = PlatformId.NA1;
    const cluster = PlatformId.AMERICAS;
    const params = { count };

    return from(this.api.summoner.getBySummonerName({
      region,
      summonerName
    })).pipe(
      tap((summoner: RiotAPITypes.Summoner.SummonerDTO) => {
        console.log(summoner)
      }),
      mergeMap((summoner: RiotAPITypes.Summoner.SummonerDTO) =>
        from(this.api.matchV5.getIdsbyPuuid({
          puuid: summoner.puuid,
          cluster,
          params
        })
        )),
      tap((matchIds: string[]) => {
        console.log(matchIds)
      }),
      mergeMap((matchIds: string[]) =>
        forkJoin(matchIds.map(matchId =>
          from(this.api.matchV5.getMatchById({
            cluster,
            matchId
          })
          )))),
      map((matches: Match[]) =>
        matches.map(match => {
          match.mainParticipant = match.info.participants.find(participant => participant.summonerName === summonerName);
          return match;
        })
      )
    );
  }
}
