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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('apple')
  getApple(): string {
    console.log('Apple... run');
    return 'Beautiful apple...';
  }

  @Post('read-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file >> ', file);

    return 'succeed';
  }

  // @Post('read-picture')
  // readPicture(@Body('imageSrc') imageSrc: string): string {
  //   console.log('imageSrc >> ', imageSrc);
  //   // console.log('req >> ', req);
  //   return 'Good';
  // }
  //
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }
}
