import express from 'express';
import { HTML_ROOT } from '../../config/server.conf.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(HTML_ROOT + '/login.html');
});

export default router;