import express from 'express';

import { ROOT } from '../config/server.conf.js';

// Routes
import login from './routes/login.js';
import index from './routes/index.js';
import other from './routes/other.js';

const app = express();

app.use(express.static(ROOT));

app
    .use(index)
    .use(login)
    .use(other);

export default app;