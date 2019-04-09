import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PlayerService } from './player.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PlayerService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe('root', () => {
  //   it('should return player 1', () => {
  //     expect(appController.getPlayer(1)).toBe();
  //   });
  // });
});
