import jwt from 'jsonwebtoken';
import express from 'express';

import key from '../../config/secret-key.js';

/**
 * @type {express.Handler}
 */
export default (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        res.sendStatus(403);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.sendStatus(403);
        return;
    }
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        next();
    })
}