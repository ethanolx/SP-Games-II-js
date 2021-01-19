import jwt from 'jsonwebtoken';

import key from '../config/secret-key.js';

export default (req, res, next) => {
    /** @type {string | undefined} */
    let token = req.headers['authorization']; //retrieve authorization header's content

    if (!token || !token.includes('Bearer')) { //process the token
        return res.status(403).send({ auth: 'false', message: 'Not authorized!' });
    }
    else {
        token = token.split(' ')[1];
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.status(403);
                return res.end({ auth: false, message: 'Not authorized!' });
            }
            else {
                req.userid = decoded.userid;
                req.role = decoded.role;
                next();
            }
        });
    }
};