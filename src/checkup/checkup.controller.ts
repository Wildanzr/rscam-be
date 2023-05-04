import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  StreamableFile,
} from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { multerOptions } from 'src/config/multer.config';

@Controller('checkup')
export class CheckupController {
  constructor(private readonly checkupService: CheckupService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      path: `http://localhost:5001/checkup/${file.filename}`,
    };
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: string) {
    const file = createReadStream(`./uploads/${image}`);
    return new StreamableFile(file);
  }
}
