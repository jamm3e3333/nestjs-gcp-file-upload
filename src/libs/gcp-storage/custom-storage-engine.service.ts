import { Injectable } from '@nestjs/common';
import * as util from 'util';
import * as stream from 'stream';
import * as Exress from 'express';
import * as Multer from 'multer';
import config from 'src/config';
import { InjectGoogleStorage } from 'src/libs/gcp-storage/storage.tokens';

interface StorageInterface {
  bucket(name: string): {
    file(path: string): {
      createWriteStream(options?: unknown): stream.Writable;
    };
  };
}

@Injectable()
export class CustomStorageEngineService implements Multer.StorageEngine {
  private bucketName: string;
  private fileDir: string;

  constructor(@InjectGoogleStorage() private storage: StorageInterface) {
    this.bucketName = config.gcp.bucket.name;
    this.fileDir = config.gcp.bucket.directories.images;
  }

  _handleFile(
    _req: Exress.Request,
    file: Express.Multer.File,
    callback: (error?: any, info?: Partial<Express.Multer.File>) => void,
  ): void {
    const fileName = `${String(Date.now())}-${file.originalname}`;
    const filePath = `${this.fileDir}/${fileName}`;

    const bucketWriteStream = this.storage
      .bucket(this.bucketName)
      .file(filePath)
      .createWriteStream();

    util
      .promisify(stream.pipeline)(file.stream, bucketWriteStream)
      .then(() =>
        callback(null, {
          originalname: file.originalname,
          destination: filePath,
        }),
      )
      .catch((error) => {
        callback(error);
      });
  }

  _removeFile(
    req: Exress.Request,
    file: Express.Multer.File,
    callback: (error: Error) => void,
  ): Promise<void> | void {}
}
