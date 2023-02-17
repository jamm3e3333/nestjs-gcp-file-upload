import { Storage } from '@google-cloud/storage';
import { DynamicModule, Module } from '@nestjs/common';
import config from 'src/config';
import {
  CUSTOM_STORAGE_ENGINE,
  GOOGLE_STORAGE,
} from 'src/libs/gcp-storage/storage.tokens';
import { CustomStorageEngineService } from './custom-storage-engine.service';
import { MulterConfigService } from './multer-config.service';

@Module({})
export class GcpStorageModule {
  static forRoot(): DynamicModule {
    return {
      module: GcpStorageModule,
      providers: [
        MulterConfigService,
        {
          provide: CUSTOM_STORAGE_ENGINE,
          useClass: CustomStorageEngineService,
        },
        {
          provide: GOOGLE_STORAGE,
          useFactory: () =>
            new Storage({
              projectId: config.gcp.projectId,
              credentials: config.gcp.serviceAccount,
            }),
        },
      ],
      exports: [CUSTOM_STORAGE_ENGINE, GOOGLE_STORAGE, MulterConfigService],
    };
  }
}
