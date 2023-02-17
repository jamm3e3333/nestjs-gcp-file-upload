import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { File } from './libs/gcp-storage/types/file';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/file-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: File,
  ) {
    return { filename: file.originalname };
  }
}
