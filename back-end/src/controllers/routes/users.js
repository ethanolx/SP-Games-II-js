// Dependencies
import express, { json, urlencoded } from 'express';

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Users from '../../models/Users.js';

/**@type {express.Router} */
const router = express.Router();

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

router.route('/users/:id')
    .get((req, res) => {
        const USER_ID = parseInt(req.params.id);
        if (invalidId(req.params.id, res)) {
            return;
        }
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
    });

router.route('/user/login')
    .post((req, res) => {
        const { username, password } = req.body;
        Users.login(username, password, (err, result) => {
            if (!err) {
                res.status(200).json({ token: result[0], user: result[1] });
            }
            else {
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