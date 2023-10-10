import { Test, TestingModule } from '@nestjs/testing';
import { FurnizoriController } from './furnizori.controller';

describe('FurnizoriController', () => {
  let controller: FurnizoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnizoriController],
    }).compile();

    controller = module.get<FurnizoriController>(FurnizoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
