import { Request, Response } from 'express';
import { getStorageProvider } from '@/services/storage'

const storage = getStorageProvider();

export const uploadController = async (req: Request, res: Response) => {
    let files = req.files as Express.Multer.File[] | undefined;

    if (!files && req.file) {
        files = [req.file];
    }

    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
        const results = await Promise.all(files.map(file => storage.uploadFile(file)));
        res.status(200).json({ files: results });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: 'Upload failed', details: errorMessage });
    }
};
