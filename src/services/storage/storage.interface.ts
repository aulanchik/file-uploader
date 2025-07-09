export interface UploadedFile {
    url: string;
    name: string;
    mimeType: string;
    size: number;
}

export interface IStorageProvider {
    uploadFile(file: Express.Multer.File): Promise<UploadedFile>;
}
