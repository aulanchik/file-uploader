import app from './app';
import { config } from '@/config/env';

app.listen(config.port, () => {
    console.log(`Server up and running on port ${config.port}`);
})
