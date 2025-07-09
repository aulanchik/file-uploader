import request from 'supertest';
import app from '../src/app';
import path from 'path';
import { mockUploadFile } from './__mocks__/services/storage';

describe('POST /api/upload', () => {
    beforeEach(() => {
        mockUploadFile.mockClear();
    });

    it('should return mocked cloud upload response', async () => {
        const res = await request(app)
            .post('/api/upload')
            .attach('file', path.join(__dirname, 'sample.txt'));

        expect(res.status).toBe(200);
        expect(res.body.url).toBe('https://mocked.url/file.txt');
        expect(res.body.name).toBe('file.txt');
        expect(mockUploadFile).toHaveBeenCalled();
    });
});
