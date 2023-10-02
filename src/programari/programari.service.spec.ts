import { Test, TestingModule } from '@nestjs/testing';
import { ProgramariService } from './programari.service';

describe('ProgramariService', () => {
  let service: ProgramariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramariService],
    }).compile();

    service = module.get<ProgramariService>(ProgramariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
