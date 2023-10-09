import { Test, TestingModule } from '@nestjs/testing';
import { FurnizorController } from './furnizor.controller';

describe('FurnizorController', () => {
  let controller: FurnizorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnizorController],
    }).compile();

    controller = module.get<FurnizorController>(FurnizorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
