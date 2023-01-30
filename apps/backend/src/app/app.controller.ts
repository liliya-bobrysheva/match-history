import { Controller, Get } from '@nestjs/common';
import { AppService, Match } from './app.service';
import { Param } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('matches/by-summoner-name/:name')
  getMatchesBySummonerName(
    @Param('name') name: string
  ): Observable<Match[]> {
    return this.appService.getMatchesBySummonerName(name);
  }
}
