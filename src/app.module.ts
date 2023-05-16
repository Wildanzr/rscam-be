import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CheckupModule } from './checkup/checkup.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UtilsModule,
    CheckupModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
