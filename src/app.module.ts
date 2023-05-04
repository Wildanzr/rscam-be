import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CheckupModule } from './checkup/checkup.module';

@Module({
  imports: [UtilsModule, CheckupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
