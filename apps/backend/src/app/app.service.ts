import { Injectable } from '@nestjs/common';
import { Observable, from, mergeMap, forkJoin, map } from 'rxjs';
import { RiotAPI, PlatformId, RiotAPITypes } from '@fightmegg/riot-api';

export interface Match extends RiotAPITypes.MatchV5.MatchDTO {
  mainParticipant: RiotAPITypes.MatchV5.ParticipantDTO;
}

function isNamesIdentical(name1: string, name2: string): boolean {
  return name1.replaceAll(' ', '').toLowerCase() === name2.replaceAll(' ', '').toLowerCase();
}

@Injectable()
export class AppService {
  api: RiotAPI;

  constructor() {
    this.api = new RiotAPI(
      "RGAPI-949a7ba4-6d72-4a38-bc4f-701031626b5c" // TODO fix exposed key
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
      mergeMap((summoner: RiotAPITypes.Summoner.SummonerDTO) =>
        from(this.api.matchV5.getIdsbyPuuid({
          puuid: summoner.puuid,
          cluster,
          params
        })
        )),
      mergeMap((matchIds: string[]) =>
        forkJoin(matchIds.map(matchId =>
          from(this.api.matchV5.getMatchById({
            cluster,
            matchId
          })
          )))),
      map((matches: Match[]) =>
        matches.map(match => {
          match.mainParticipant = match.info.participants.find(participant => isNamesIdentical(participant.summonerName, summonerName));
          return match;
        })
      )
    );
  }
}
