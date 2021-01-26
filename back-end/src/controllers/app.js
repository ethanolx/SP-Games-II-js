// Dependencies
import express from 'express';
import cors from 'cors';

// Routers
import restrictions from './restricted.js';
import root from './routes/root.js';
import users from './routes/users.js';
import games from './routes/games.js';
import categories from './routes/categories.js';
import platforms from './routes/platforms.js';
import reviews from './routes/reviews.js';
import other from './routes/other.js';

//%     API Registration Module     %//

/** @type {express.Express} */
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/', restrictions);

app
    .use('/', root)
    .use('/', users)
    .use('/', games)
    .use('/', categories)
    .use('/', platforms)
    .use('/', reviews)
    .use('/', other);

export default app;