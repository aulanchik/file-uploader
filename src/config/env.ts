import dotenv from 'dotenv'
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    storageProvider: process.env.STORAGE_PROVIDER || 'gcs',
    gcs: {
        bucketName: process.env.GCS_BUCKET!,
        keyFile: process.env.GCS_KEYFILE!,
    },
};
