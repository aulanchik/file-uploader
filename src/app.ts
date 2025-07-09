import express from 'express'
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello');
});

export default app;
