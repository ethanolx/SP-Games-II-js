import jwt from 'jsonwebtoken';
import express from 'express';

import key from '../config/secret-key.js';

/**
 * @type {express.Handler}
 */
export default (req, res, next) => {
    /** @type {string | undefined} */
    let token = req.headers['authorization']; //retrieve authorization header's content

    if (!token || !token.includes('Bearer')) { //process the token
        res.status(403).json({ auth: 'false', message: 'Not authorized!' });
    }
    else {
        token = token.split(' ')[1];
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.status(403);
                return res.end({ auth: false, message: 'Not authorized!' });
            }
            else {
                // @ts-ignore
                req.userid = decoded.userid;
                req.type = decoded.type;
                next();
            }
        });
    }
};