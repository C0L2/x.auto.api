import { Test, TestingModule } from '@nestjs/testing';
import { MasiniController } from './masini.controller';

describe('MasiniController', () => {
  let controller: MasiniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasiniController],
    }).compile();

    controller = module.get<MasiniController>(MasiniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
