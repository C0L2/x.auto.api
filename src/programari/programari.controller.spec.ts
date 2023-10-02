import { Test, TestingModule } from '@nestjs/testing';
import { ProgramariController } from './programari.controller';

describe('ProgramariController', () => {
  let controller: ProgramariController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramariController],
    }).compile();

    controller = module.get<ProgramariController>(ProgramariController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
