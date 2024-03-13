import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OrchestratorService {
 
  private playersShouldStop = new Subject<string>();

  playersShouldStop$ = this.playersShouldStop.asObservable();

  stopOtherPlayers(playerId: string) {
    console.log(playerId);
    this.playersShouldStop.next(playerId);
  }

}