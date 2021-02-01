import app from './controllers/app.js';
import { PORT, HOST } from './config/server.config.js';

app.listen(PORT, HOST, () => {
    console.log(`Back-End Server started and listening on http://${ HOST }:${ PORT } ...`);
});