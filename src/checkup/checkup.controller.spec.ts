import { Test, TestingModule } from '@nestjs/testing';
import { CheckupController } from './checkup.controller';
import { CheckupService } from './checkup.service';

describe('CheckupController', () => {
  let controller: CheckupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckupController],
      providers: [CheckupService],
    }).compile();

    controller = module.get<CheckupController>(CheckupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
