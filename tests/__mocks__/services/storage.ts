import { IStorageProvider, UploadedFile } from '../../../src/services/storage/storage.interface';

export const mockUploadFile = jest.fn<Promise<UploadedFile>, [Express.Multer.File]>(() =>
    Promise.resolve({
        url: 'https://mocked.url/file.txt',
        name: 'file.txt',
        mimeType: 'text/plain',
        size: 123,
    })
);

export const getStorageProvider = (): IStorageProvider => ({
    uploadFile: mockUploadFile,
});
