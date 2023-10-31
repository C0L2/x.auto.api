import { Test, TestingModule } from '@nestjs/testing';
import { AssignedServicesController } from './assigned-services.controller';

describe('AssignedServicesController', () => {
  let controller: AssignedServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedServicesController],
    }).compile();

    controller = module.get<AssignedServicesController>(AssignedServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
