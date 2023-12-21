import { Test, TestingModule } from '@nestjs/testing';
import { AssignedCarPartsService } from './assigned-carparts.service';

describe('AssignedCarpartsService', () => {
  let service: AssignedCarPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedCarPartsService],
    }).compile();

    service = module.get<AssignedCarPartsService>(AssignedCarPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
