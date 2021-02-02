import express from 'express';

/**
 * @param {'body' | 'params'} location
 * @param {string} label
 * @returns {express.Handler}
 */
export default (label) => {
    return (req, res, next) => {
        const target = req.params[label];
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