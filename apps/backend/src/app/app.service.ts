import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  getMatchesBySummonerName(name: string): Observable<any[]> {
    return of([{ info: name }]);
  }
}
