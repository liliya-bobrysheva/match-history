import { Injectable } from '@nestjs/common';
import { Observable, from, mergeMap, forkJoin, tap } from 'rxjs';
import { RiotAPI, PlatformId } from '@fightmegg/riot-api';

@Injectable()
export class AppService {

  // TODO get rid of "any" types
  // TODO riot api service in constructor
  // TODO fix API key exposed in codebase
  // TODO separate method for each api request
  getMatchesBySummonerName(name: string): Observable<any[]> {
    const riotApi = new RiotAPI(
      "RGAPI-a567455f-c201-4b60-a849-aa5e3d97a384"
    );

    return from(riotApi.summoner.getBySummonerName({
      region: PlatformId.NA1,
      summonerName: name
    })).pipe(
      tap((summoner: any) => {
        console.log(summoner)
      }),
      mergeMap((summoner: any) =>
        from(riotApi.matchV5.getIdsbyPuuid({
          puuid: summoner.puuid,
          cluster: PlatformId.AMERICAS,
          params: { count: 5 }
        })
        )),
      tap((matchIds: string[]) => {
        console.log(matchIds)
      }),
      mergeMap((matchIds: string[]) =>
        forkJoin(matchIds.map(matchId =>
          from(riotApi.matchV5.getMatchById({
            cluster: PlatformId.AMERICAS,
            matchId
          })
          ))))
    );
  }
}
