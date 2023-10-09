import { Test, TestingModule } from '@nestjs/testing';
import { FurnizorService } from './furnizor.service';

describe('FurnizorService', () => {
  let service: FurnizorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnizorService],
    }).compile();

    service = module.get<FurnizorService>(FurnizorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
