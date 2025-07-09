import express from 'express';
import { upload } from '@/utils/multer';
import { uploadController } from '@/controllers/upload.controller';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadController);

export default router;
