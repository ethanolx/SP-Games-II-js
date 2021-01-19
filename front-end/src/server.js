import app from './controllers/app.js';
import { PORT, HOST } from './config/server.conf.js';

const server = app.listen(PORT, HOST, () => {
    console.log(`Front-End application started and serving on http://${ HOST }:${ PORT }...`);
});