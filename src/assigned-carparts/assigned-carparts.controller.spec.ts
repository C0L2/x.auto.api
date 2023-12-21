import { Test, TestingModule } from '@nestjs/testing';
import { AssignedCarpartsController } from './assigned-carparts.controller';

describe('AssignedCarpartsController', () => {
  let controller: AssignedCarpartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedCarpartsController],
    }).compile();

    controller = module.get<AssignedCarpartsController>(AssignedCarpartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
