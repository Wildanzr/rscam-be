import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CheckupModule } from './checkup/checkup.module';

@Module({
  imports: [UtilsModule, CheckupModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
