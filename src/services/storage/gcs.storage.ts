import { config } from '@/config/env'
import { Storage } from '@google-cloud/storage';
import { IStorageProvider, UploadedFile } from './storage.interface';

export class GCSStorage implements IStorageProvider {
    private storage = new Storage({ keyFilename: config.gcs.keyFile });
    private bucket = this.storage.bucket(config.gcs.bucketName);

    async uploadFile(file: Express.Multer.File): Promise<UploadedFile> {
        const blob = this.bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        return new Promise<UploadedFile>((resolve, reject) => {
            blobStream.on('error', reject);
            blobStream.on('finish', () => {
                const url = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`;
                resolve({
                    url,
                    name: blob.name,
                    mimeType: file.mimetype,
                    size: file.size,
                });
            });

            blobStream.end(file.buffer);
        });
    }
}
