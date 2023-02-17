import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcpStorageModule } from './libs/gcp-storage/gcp-storage.module';
import { MulterConfigService } from './libs/gcp-storage/multer-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
      imports: [GcpStorageModule.forRoot()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
