import { Test, TestingModule } from '@nestjs/testing';
import { WorkerReportService } from './worker-report.service';

describe('WorkerReportService', () => {
  let service: WorkerReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerReportService],
    }).compile();

    service = module.get<WorkerReportService>(WorkerReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
