import express from 'express';
import { HTML_ROOT } from '../../config/server.conf.js';

const router = express.Router();

router.get(['/', '/games', '/game/:id', '/profile', '/admin', '/login'], (req, res) => {
    res.sendFile(HTML_ROOT + '/index2.html');
});

export default router;