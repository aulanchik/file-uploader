import { config } from '@/config/env';
import { GCSStorage } from './gcs.storage';
import { IStorageProvider } from './storage.interface';

export function getStorageProvider(): IStorageProvider {
    if (config.storageProvider === 'gcs') {
        return new GCSStorage();
    }

    throw new Error('Unsupported storage provider!');
}
