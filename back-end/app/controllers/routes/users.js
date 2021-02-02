// Dependencies
import express from 'express';
import multer from 'multer';
import { extname, dirname, join } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
import verifyData from '../../middleware/verify-data.js';
import verifyId from '../../middleware/verify-id.js';
import verifyLogin from '../../middleware/auth/verify-login.js';

// Model
import Users from '../../models/Users.js';

// Configurations
import { HOST, MAX_FILE_SIZE, MEDIA_TYPES_SUPPORTED, PORT } from '../../config/server.config.js';

/**@type {express.Router} */
const router = express.Router();

// Multipart Handling Middleware
const IMAGE_STORAGE = multer({
    storage: multer.diskStorage({
        destination: (req, file, fn) => {
            fn(null, './assets/user-images');
        },
        filename: (req, file, fn) => {
            fn(null, `${ req.params.uid }${ extname(file.originalname) }`);
        }
    }), limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, fn) => {
        fn(null, MEDIA_TYPES_SUPPORTED.includes(extname(file.originalname)));
    }
});

// Middleware to Serve Static Assets
router.use(express.static(join(__dirname, '..', '..', '..', 'assets', 'user-images')));

// Route Handlers
router.route('/users')
    .get((req, res) => {
        Users.findAll((err, results) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (results === null) {
                res.status(200).json([]);
            }
            else {
                res.status(200).json(results);
            }
        });
    })
    .post(verifyData({
        username: 'string',
        email: 'string',
        password: 'string',
        profile_pic_url: 'string?'
    }), (req, res) => {
        /**@type {import('../../models/Users.js').User} */
        const USER = req.body;
        Users.insert(USER, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ userid: result.insertId });
            }
        });
    });

router.patch('/user/:uid/image', verifyId('uid'), IMAGE_STORAGE.single('userImage'), (req, res) => {
    if (req.file) {
        const USER_ID = parseInt(req.params.uid);
        const NEW_PROFILE_PIC_URL = `http://${ HOST }:${ PORT }/${ USER_ID.toString() + extname(req.file.originalname) }`;
        Users.update(USER_ID, { profile_pic_url: NEW_PROFILE_PIC_URL }, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    }
    else {
        res.status(415).json({ media_types_supported: MEDIA_TYPES_SUPPORTED, max_file_size_bytes: MAX_FILE_SIZE });
    }
});

router.route('/user/verify-login')
    .post(verifyLogin);

router.route('/users/:id')
    .all(verifyId('id'))
    .get((req, res) => {
        const USER_ID = parseInt(req.params.id);
        const { token } = req.body;
        Users.findOne(USER_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (result === null) {
                res.sendStatus(404);
            }
            else {
                res.status(200).json(result[0]);
            }
        });
    })
    .put((req, res) => {
        const USER_ID = parseInt(req.params.id);
        /** @type {import('../../models/Users.js').User} */
        const USER = req.body;
        Users.update(USER_ID, USER, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

router.route('/user/login')
    .post((req, res) => {
        const { username, password } = req.body;
        Users.login(username, password, (err, result) => {
            if (!err) {
                res.status(200).json({ token: result });
            }
            else {
                // @ts-ignore
                if (err.status === 500) {
                    res.sendStatus(403);
                }
                else {
                    res.sendStatus(500);
                }
            }
        });
    });

export default router;