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

app.use('/api', uploadRoutes);
app.use('/ping', (req, res) => {
    res.send('PONG');
})

export default app;
