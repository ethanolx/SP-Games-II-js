import express from 'express';

/**
 * @param {'body' | 'params'} location
 * @param {string} label
 * @returns {express.Handler}
 */
export default (location, label) => {
    return (req, res, next) => {
        let target;
        switch (location) {
            case 'body':
                target = req.body[label];
                break;
            case 'params':
                target = req.params[label];
                break;
        }
        const AUTHORISED_USER_ID = res.locals.userid;
        const TARGET_USER_ID = parseInt(target);
        if (AUTHORISED_USER_ID === TARGET_USER_ID) {
            next();
        }
        else {
            res.status(401).json({ message: `No Access to User ${ TARGET_USER_ID }` });
        }
    };
};