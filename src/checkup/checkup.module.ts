import { Module } from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { CheckupController } from './checkup.controller';

@Module({
  controllers: [CheckupController],
  providers: [CheckupService],
})
export class CheckupModule {}
