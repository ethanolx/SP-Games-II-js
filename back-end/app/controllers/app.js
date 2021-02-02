// Dependencies
import express, { json, urlencoded } from 'express';
import cors from 'cors';

// Routers
import restrictions from './restricted.js';
import users from './routes/users.js';
import games from './routes/games.js';
import categories from './routes/categories.js';
import platforms from './routes/platforms.js';
import reviews from './routes/reviews.js';

// Configurations
import { FRONT_END_HOST, FRONT_END_PORT } from '../config/server.config.js';

//%     API Registration Module     %//

/** @type {express.Express} */
const app = express();

app.use(cors({ origin: `http://${ FRONT_END_HOST }:${ FRONT_END_PORT }` }));

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', restrictions);

app
    .use('/', users)
    .use('/', games)
    .use('/', categories)
    .use('/', platforms)
    .use('/', reviews);

export default app;