import express from 'express';
import { HOST, PORT } from '../../config/server.conf.js';

const router = express.Router();

router.all('*', (req, res) => {
    if (req.method !== 'GET') {
        res.sendStatus(405);
    }
    else {
        res.redirect(`/`);
    }
});

export default router;