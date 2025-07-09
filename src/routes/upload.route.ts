import express from 'express';
import { multiUpload } from '@/utils/multer';
import { uploadController } from '@/controllers/upload.controller';

const router = express.Router();

router.post('/upload', multiUpload, uploadController);

export default router;
