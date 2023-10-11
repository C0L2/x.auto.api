import { Test, TestingModule } from '@nestjs/testing';
import { WorkerReportController } from './worker-report.controller';

describe('WorkerReportController', () => {
  let controller: WorkerReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerReportController],
    }).compile();

    controller = module.get<WorkerReportController>(WorkerReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
