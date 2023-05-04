import { Test, TestingModule } from '@nestjs/testing';
import { CheckupService } from './checkup.service';

describe('CheckupService', () => {
  let service: CheckupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckupService],
    }).compile();

    service = module.get<CheckupService>(CheckupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
