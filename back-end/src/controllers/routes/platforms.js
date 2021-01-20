// Dependencies
import express, { json, urlencoded } from 'express';

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Platforms from '../../models/Platforms.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

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
    .post((req, res) => {
        /**@type {import('../../models/Platforms.js').Platform} */
        const PLATFORM = req.body;
        if (invalidBody(PLATFORM, {
            platform: 'string',
            version: 'string'
        }, res)) {
            return;
        }
        Platforms.insert(PLATFORM, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The platform \'${ PLATFORM.platform }\' already exists` });
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
    .put((req, res) => {
        /**@type {import('../../models/Platforms.js').Platform} */
        const PLATFORM = req.body;
        const { id } = req.params;
        const platformid = parseInt(id);
        if (invalidId(id, res) || invalidBody(PLATFORM, {
            platform: 'string',
            version: 'string'
        }, res)) {
            return;
        }
        Platforms.update(PLATFORM, platformid, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The platform \'${ PLATFORM.platform }\' already exists` });
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

export default router;