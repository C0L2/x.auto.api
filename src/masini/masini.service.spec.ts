import { Test, TestingModule } from '@nestjs/testing';
import { MasiniService } from './masini.service';

describe('MasiniService', () => {
  let service: MasiniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasiniService],
    }).compile();

    service = module.get<MasiniService>(MasiniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
