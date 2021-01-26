import express from 'express';

/**
 * Validates an id in string form
 *
 * Criteria:
 *  - Integer
 *  - No non-numeric characters
 * @param {string} id
 * @returns {express.Handler}
 */
export default (id) => {
    return (req, res, next) => {
        const PARSED_ID = parseInt(id);
        if (`${ PARSED_ID }` !== id) {
            res.status(400).json({ message: 'Invalid id provided' });
            return;
        }
        next();
    }
};