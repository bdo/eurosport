import { Controller, Get, Param, Query, HttpStatus, HttpException, Delete } from '@nestjs/common';
import { Player } from './player.model';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Controller('players')
export class AppController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getPlayers(@Query('sortby') sortBy?: string): Observable<Player[]> {
    return this.playerService.getAll().pipe(
      map((players: Player[]) => players.sort((a, b) => {
        if (sortBy && sortBy === 'lastname') {
          if (a.lastname === b.lastname) {
            if (a.firstname === b.firstname) { return 0; }
            return a.firstname > b.firstname ? 1 : -1;
          }
          return a.lastname > b.lastname ? 1 : -1;
        } else if (sortBy && sortBy === 'data.rank') {
          return a.data.rank - b.data.rank;
        }
        return a.id - b.id;
      })),
    );
  }
  @Get(':id')
  getPlayer(@Param('id') id: number): Observable<Player> {
    return this.playerService.get(id).pipe(
      tap(player => {
        if (!player) {
          throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }
  @Delete(':id')
  deletePlayer(@Param('id') id: number): Observable<void> {
    return this.playerService.deletePlayer(id).pipe(
      map(isDeleted => {
        if (!isDeleted) {
          throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }
}
