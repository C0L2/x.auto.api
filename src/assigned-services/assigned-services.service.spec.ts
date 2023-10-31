import { Test, TestingModule } from '@nestjs/testing';
import { AssignedServicesService } from './assigned-services.service';

describe('AssignedServicesService', () => {
  let service: AssignedServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedServicesService],
    }).compile();

    service = module.get<AssignedServicesService>(AssignedServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
