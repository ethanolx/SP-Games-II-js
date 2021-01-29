import express from 'express';
import { HTML_ROOT } from '../../config/server.conf.js';

const router = express.Router();

router.get(['/', '/games', '/game/:id', '/profile', '/categories', '/platforms', '/games-admin', '/login'], (req, res) => {
    res.sendFile(HTML_ROOT + '/index.html');
});

export default router;