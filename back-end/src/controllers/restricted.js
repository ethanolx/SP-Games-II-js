import express from 'express';
import verifyToken from '../middleware/auth/verify-token.js';

const router = express.Router();

router
    // Lock POST routes
    .post(['/category', '/platform', '/user/:uid/game/:gid/review', '/users', '/game', '/game/:gid/image'], verifyToken)
    // Lock PUT routes
    .put(['/category/:id', '/platform/:id', '/users/:id', '/game/:id'], verifyToken)
    // Lock PATCH routes
    .patch(['/user/:uid/image', '/game/:gid/image'], verifyToken)
    // Lock DELETE routes
    .delete(['/category/:id', '/platform/:id', '/game/:id'], verifyToken);

export default router;