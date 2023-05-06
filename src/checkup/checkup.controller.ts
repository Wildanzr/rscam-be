import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  StreamableFile,
  Body,
} from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { multerOptions } from 'src/config/multer.config';
import { Checkup } from './entities/checkup.entity';

@Controller('checkup')
export class CheckupController {
  constructor(private readonly checkupService: CheckupService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files', multerOptions))
  async uploadFile(@UploadedFile() files: Express.Multer.File) {
    const PORT = process.env.PORT || 5000;
    return {
      message: 'File uploaded successfully',
      path: `http://localhost:${PORT}/checkup/file/${files.filename}`,
    };
  }

  @Get('/file/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string) {
    const file = createReadStream(`./uploads/${image}`);
    return new StreamableFile(file);
  }

  @Post('')
  async addCheckup(@Body() body: Checkup) {
    return await this.checkupService.addCheckup(body);
  }

  @Get(':id')
  async getCheckup(@Param('id') id: string) {
    return await this.checkupService.getCheckup(id);
  }
}
