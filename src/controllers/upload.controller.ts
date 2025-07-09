import { Request, Response } from 'express';
import { getStorageProvider } from '@/services/storage'

const storage = getStorageProvider();

export const uploadController = async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const result = await storage.uploadFile(file);
        res.status(200).json(result);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: 'Upload failed', details: errorMessage });
    }
};
