// Dependency
import express from 'express';

/** @type {express.Router} */
const router = express.Router();

// Reject all non-GET requests
// Redirect illegal routes to home
router.all('*', (req, res) => {
    if (req.method !== 'GET') {
        res.sendStatus(405);
    }
    else {
        res.redirect('/');
    }
});

export default router;