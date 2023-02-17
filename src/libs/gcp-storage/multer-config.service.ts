import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { StorageEngine } from 'multer';
import { InjectCustomStorageEngine } from 'src/libs/gcp-storage/storage.tokens';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    @InjectCustomStorageEngine() private storageEngine: StorageEngine,
  ) {}
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.storageEngine,
    };
  }
}
