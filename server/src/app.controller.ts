import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './common/multerOptions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('apple')
  getApple(): string {
    console.log('Apple... run');
    return 'Beautiful apple...';
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('read-picture')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile2(@UploadedFile() file: Express.Multer.File) {
    console.log('file >> ', file);
    console.log(file.filename);
    return { state: 'succeed', file };
    // return 'succeed';
  }
}
