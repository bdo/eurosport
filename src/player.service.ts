import { Injectable } from '@nestjs/common';
import { Player } from './player.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';

@Injectable()
export class PlayerService {
  public getAll(): Observable<Player[]> {
    return Observable.create(observer => {
      axios.get(
          'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json',
        )
        .then(response => {
          observer.next(response.data.players as Player[]);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
  public get(id: number): Observable<Player> {
    return this.getAll().pipe(
      map(players => {
        // I dont know why my id type or player array id type is incorrect
        // tslint:disable-next-line:triple-equals
        return players.find(player => player.id == id);
      }),
    );
  }
  public deletePlayer(id: number): Observable<boolean> {
    return this.get(id).pipe(
      map(player => {
        // do stuff to delete player or handle exception
        return player !== undefined;
      }),
    );
  }
}
