// Imports
import express from 'express';
import verifyAdmin from '../middleware/auth/verify-admin.js';
import verifyToken from '../middleware/auth/verify-token.js';
import verifyUser from '../middleware/auth/verify-user.js';

/** @type {express.Router} */
const router = express.Router();

// Verify Login Status
router
    .post(['/category', '/platform', '/user/:uid/game/:gid/review', '/game'], verifyToken)
    .put(['/category/:id', '/platform/:id', '/users/:id', '/game/:id'], verifyToken)
    .patch(['/user/:uid/image', '/game/:gid/image'], verifyToken)
    .delete(['/category/:id', '/platform/:id', '/game/:id'], verifyToken);

// Verify User is Modifying Their Details Only
router
    .post('/user/:uid/game/:gid/review', verifyUser('params', 'uid'))
    .put('/users/:id', verifyUser('params', 'id'))
    .patch('/user/:uid/image', verifyUser('params', 'uid'));

// Verify User is an Administrator
router
    .post(['/category', '/platform', '/game'], verifyAdmin)
    .put(['/category/:id', '/platform/:id', '/game/:id'], verifyAdmin)
    .patch(['/game/:gid/image'], verifyAdmin)
    .delete(['/category/:id', '/platform/:id', '/game/:id'], verifyAdmin);

export default router;