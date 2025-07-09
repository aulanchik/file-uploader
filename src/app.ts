import express from 'express'
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import uploadRoutes from '@/routes/upload.route';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.get('/api', uploadRoutes);
app.get('/ping', (req, res) => {
    res.send('PONG');
})

export default app;
