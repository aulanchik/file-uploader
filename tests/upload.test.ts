import request from 'supertest';
import app from '../src/app';
import tmp from 'tmp';
import fs from 'fs';
import { mockUploadFile } from './__mocks__/services/storage';

const createTempFile = (filename: string, content: string): string => {
    const tmpFile = tmp.fileSync({ postfix: `-${filename}` });
    fs.writeFileSync(tmpFile.name, content);
    return tmpFile.name;
};

describe('POST /api/upload', () => {
    beforeEach(() => {
        mockUploadFile.mockClear();
    });

    it('should upload a single file and return its reference', async () => {
        const filePath = createTempFile('sample.txt', 'Single file content');

        const res = await request(app)
            .post('/api/upload')
            .attach('files', filePath);

        expect(res.status).toBe(200);
        expect(res.body.files.length).toBe(1);
        expect(res.body.files[0].url).toBe('https://mocked.url/file.txt');
        expect(mockUploadFile).toHaveBeenCalledTimes(1);
    });

    it('should upload multiple files and return their references', async () => {
        const file1 = createTempFile('sample1.txt', 'First file content');
        const file2 = createTempFile('sample2.txt', 'Second file content');

        const res = await request(app)
            .post('/api/upload')
            .attach('files', file1)
            .attach('files', file2);

        expect(res.status).toBe(200);
        expect(res.body.files.length).toBe(2);
        expect(mockUploadFile).toHaveBeenCalledTimes(2);
    });
});
