import jwt from 'jsonwebtoken';
import express from 'express';

import key from '../../config/secret-key.js';
import Users from '../../models/Users.js';

/**
 * @type {express.Handler}
 */
export default (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, key, (err, decoded) => {
        if (err || !decoded) {
            res.sendStatus(401);
        }
        else {
            const DECODED_TOKEN = decoded;
            Users.findOne(DECODED_TOKEN['id'], (err, result) => {
                if (err || !result) {
                    res.sendStatus(401)
                }
                else {
                    res.status(200).json(result[0]);
                }
            });
        }
    })
}