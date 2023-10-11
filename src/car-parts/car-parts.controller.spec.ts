import { Test, TestingModule } from '@nestjs/testing';
import { CarPartsController } from './car-parts.controller';

describe('CarPartsController', () => {
  let controller: CarPartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarPartsController],
    }).compile();

    controller = module.get<CarPartsController>(CarPartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
