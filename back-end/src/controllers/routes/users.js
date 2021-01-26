// Dependencies
import express, { json, urlencoded } from 'express';
import multer from 'multer';
import { extname, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Users from '../../models/Users.js';
import isLoggedIn from '../../utils/is-logged-in.js';

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

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

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
    .post((req, res) => {
        /**@type {import('../../models/Users.js').User} */
        const USER = req.body;
        if (invalidBody(USER, {
            username: 'string',
            email: 'string',
            password: 'string',
            type: 'string',
            profile_pic_url: 'string?'
        }, res)) {
            return;
        }
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

router.use(express.static(join(__dirname, '..', '..', '..', 'assets', 'user-images')));

router.patch('/user/:uid/image', (req, res, next) => {
    if (invalidId(req.params.uid, res)) {
        res.sendStatus(400);
    }
    else {
        next();
    }
}, IMAGE_STORAGE.single('userImage'), (req, res) => {
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
    .post(isLoggedIn);

router.route('/users/:id')
    .all((req, res, next) => {
        if (invalidId(req.params.id, res)) {
            return;
        }
        next();
    })
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