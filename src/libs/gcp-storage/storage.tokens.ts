import { Inject } from '@nestjs/common';

export const GOOGLE_STORAGE = Symbol.for('GOOGLE_STORAGE');

export const CUSTOM_STORAGE_ENGINE = Symbol.for('CUSTOM_STORAGE_ENGINE');

export const InjectGoogleStorage = (): ReturnType<typeof Inject> =>
  Inject(GOOGLE_STORAGE);

export const InjectCustomStorageEngine = (): ReturnType<typeof Inject> =>
  Inject(CUSTOM_STORAGE_ENGINE);
