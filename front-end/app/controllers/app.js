// Dependency
import express from 'express';

// Configuration
import { ROOT } from '../config/server.conf.js';

// Routes
import index from './routes/index.js';
import other from './routes/other.js';

/** @type {express.Application} */
const app = express();

app.use(express.static(ROOT));

app
    .use(index)
    .use(other);

export default app;