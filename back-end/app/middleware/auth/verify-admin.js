import express from 'express';

import Users from '../../models/Users.js';

/**
 * @type {express.Handler}
 */
export default (req, res, next) => {
    const USER_ID = res.locals.userid;
    Users.findOne(USER_ID, (err, result) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            if (result instanceof Array && result.length === 0) {
                res.sendStatus(404);
            }
            else {
                /** @type {import('../../models/Users.js').User} */
                const USER = result[0];
                console.log(USER);
                if (USER.type === 'Admin') {
                    next();
                }
                else {
                    res.status(401).json({ message: 'You don\'t have Admin Permissions' });
                }
            }
        }
    });
};