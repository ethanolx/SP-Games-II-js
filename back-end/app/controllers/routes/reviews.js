// Dependencies
import express from 'express';

// Middleware
import verifyData from '../../middleware/verify-data.js';
import verifyId from '../../middleware/verify-id.js';

// Model
import Reviews from '../../models/Reviews.js';

/**@type {express.Router} */
const router = express.Router();

// Route Handlers
router.route('/game/:id/review')
    .all(verifyId('params', 'id'))
    .get((req, res) => {
        // Extract and Process Data
        const GAME_ID = parseInt(req.params.id);

        // Evaluate Data and Respond
        Reviews.findByGame(GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (result === null) {
                res.status(200).json([]);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

router.route('/user/:uid/game/:gid/review')
    .post(verifyId('params', 'uid'), verifyId('params', 'gid'), verifyData({
        content: 'string',
        rating: 'number'
    }), (req, res) => {
        // Extract Data
        /** @type {import('../../models/Reviews.js').Review} */
        const REVIEW = req.body;
        const { uid, gid } = req.params;

        // Process Data
        const USER_ID = parseInt(uid);
        const GAME_ID = parseInt(gid);

        // Evaluate Data and Respond
        Reviews.insert(USER_ID, GAME_ID, REVIEW, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ reviewid: result.insertId });
            }
        });
    });

export default router;