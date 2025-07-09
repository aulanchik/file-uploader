import multer from 'multer';

const MAX_FILES_LIMIT = 5;

const upload = multer({ storage: multer.memoryStorage() });

const multiUpload = upload.array('files', MAX_FILES_LIMIT);

export { multiUpload }
