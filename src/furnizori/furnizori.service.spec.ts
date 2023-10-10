import { Test, TestingModule } from '@nestjs/testing';
import { FurnizoriService } from './furnizori.service';

describe('FurnizoriService', () => {
  let service: FurnizoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnizoriService],
    }).compile();

    service = module.get<FurnizoriService>(FurnizoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
