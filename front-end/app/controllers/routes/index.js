// Imports
import express from 'express';
import { HTML_ROOT } from '../../config/server.conf.js';

/** @type {express.Router} */
const router = express.Router();

// Serve only one file - Client Side Routing managed by SPA
router.get(['/', '/games', '/game/:id', '/profile', '/categories', '/platforms', '/games-admin', '/login'], (req, res) => {
    res.sendFile(HTML_ROOT + '/index.html');
});

export default router;