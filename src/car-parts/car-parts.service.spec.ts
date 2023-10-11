import { Test, TestingModule } from '@nestjs/testing';
import { CarPartsService } from './car-parts.service';

describe('CarPartsService', () => {
  let service: CarPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarPartsService],
    }).compile();

    service = module.get<CarPartsService>(CarPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
