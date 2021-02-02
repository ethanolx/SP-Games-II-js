// Dependencies
import express from 'express';

// Middleware
import verifyData from '../../middleware/verify-data.js';
import verifyId from '../../middleware/verify-id.js';

// Model
import Platforms from '../../models/Platforms.js';

/**@type {express.Router} */
const router = express.Router();

// Route Handlers
router.route('/platform')
    .get((req, res) => {
        Platforms.findAll((err, results) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(results);
            }
        });
    })
    .post(verifyData({
        platform: 'string',
        version: 'string'
    }), (req, res) => {
        /**@type {import('../../models/Platforms.js').Platform} */
        const PLATFORM = req.body;
        Platforms.insert(PLATFORM, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The platform \'${ PLATFORM.platform.toLowerCase() } ${PLATFORM.version.toLowerCase()}\' already exists` });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(204);
            }
        });
    });

router.route('/platform/:id')
    .all(verifyId('id'))
    .put(verifyData({
        platform: 'string',
        version: 'string'
    }), (req, res) => {
        /**@type {import('../../models/Platforms.js').Platform} */
        const PLATFORM = req.body;
        const { id } = req.params;
        const platformid = parseInt(id);
        Platforms.update(PLATFORM, platformid, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The platform \'${ PLATFORM.platform.toLowerCase() } ${PLATFORM.version.toLowerCase()}\' already exists` });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(204);
            }
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Platforms.delete(parseInt(id), (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        })
    })

export default router;