// Dependencies
import express from 'express';
import multer from 'multer';
import { extname } from 'path';
import { promisify } from 'util';

// Utilities
import { findImagesOfGame, removePrevImage } from '../../utils/image-upload-utilities.js';
import { logError } from '../../utils/logs.js';

// Middleware
import verifyData from '../../middleware/verify-data.js';
import verifyId from '../../middleware/verify-id.js';

// Model
import Games from '../../models/Games.js';

// Configurations
import { HOST, PORT, MAX_FILE_SIZE, MEDIA_TYPES_SUPPORTED } from '../../config/server.config.js';

/**@type {express.Router} */
const router = express.Router();

// Route Handlers
router.route('/game')
    .post(verifyData({
        title: 'string',
        description: 'string',
        price: 'number',
        year: 'number?',
        platformids: 'object',
        categoryids: 'object'
    }), (req, res) => {
        /** @type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        Games.insert(GAME, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ gameid: result.insertId });
            }
        });
    });

router.route('/games')
    .get((req, res) => {
        Games.findAll((err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

// router.route('/games/:platform')
//     .get((req, res) => {
//         const { platform } = req.params;
//         const { version } = req.query ?? null;
//         //@ts-ignore
//         Games.findByPlatform(platform, version, (err, results) => {
//             if (err) {
//                 res.sendStatus(500);
//             }
//             else if (results === null) {
//                 res.sendStatus(404);
//             }
//             else {
//                 res.status(200).json(results);
//             }
//         });
//     });

router.route('/game/:id')
    .all(verifyId('id'))
    .get((req, res) => {
        const gid = parseInt(req.params.id);
        Games.findOneFull(gid, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    })
    .put(verifyData({
        title: 'string',
        description: 'string',
        price: 'number',
        year: 'number?',
        platformids: 'object',
        categoryids: 'object'
    }), (req, res) => {
        /**@type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        const GAME_ID = parseInt(req.params.id);
        Games.update(GAME, GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    })
    .delete((req, res) => {
        const GAME_ID = parseInt(req.params.id);
        Games.delete(GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

// Multipart Handling Middleware
const IMAGE_STORAGE = multer({
    storage: multer.diskStorage({
        destination: (req, file, fn) => {
            fn(null, './assets/game-images');
        },
        filename: (req, file, fn) => {
            fn(null, `${ req.params.gid }${ extname(file.originalname) }`);
        }
    }), limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, fn) => {
        fn(null, MEDIA_TYPES_SUPPORTED.includes(extname(file.originalname)));
    }
});

// Image Uploads
router.route('/game/:gid/image')
    .all(verifyId('gid'))
    .get(async (req, res) => {
        const GAME_ID = parseInt(req.params.gid);
        const FILES = await findImagesOfGame(GAME_ID).catch(logError);
        const GAMES = await promisify(Games.findOne)(GAME_ID).catch(logError);
        if (GAMES === null) {
            res.status(422).json({ message: 'Game does not exist' });
        }
        else if (FILES) {
            res.status(200).sendFile(FILES[0], { root: './assets/game-images' }, (err) => { if (err) logError(err); });
        }
        else {
            res.sendStatus(404);
        }
    })
    .patch((req, res, next) => {
        const GAME_ID = parseInt(req.params.gid);
        Games.findOne(GAME_ID, async (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (result === null) {
                res.status(422).json({ message: 'Game does not exist' });
            }
            else {
                const FILES = await findImagesOfGame(parseInt(req.params.gid)).catch(logError);
                if (FILES) {
                    await removePrevImage(GAME_ID).catch(logError);
                }
                next();
            }
        });
    })
    .patch(IMAGE_STORAGE.single('gameImage'))
    .patch((req, res) => {
        req.file ?
            res.sendStatus(204) :
            res.status(415).json({ media_types_supported: MEDIA_TYPES_SUPPORTED, max_file_size_bytes: MAX_FILE_SIZE });
    });

export default router;