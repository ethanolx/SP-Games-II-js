import express from 'express';

/**
 * Validates an id in string form
 *
 * Criteria:
 *  - Integer
 *  - No non-numeric characters
 * @param {'body' | 'params'} location
 * @param {string} label
 * @returns {express.Handler}
 */
export default (location, label) => {
    return (req, res, next) => {
        /** @type { string} */
        let id;
        switch (location) {
            case 'body':
                id = req.body[label];
                break;
            case 'params':
                id = req.params[label];
                break;
        }
        const PARSED_ID = parseInt(id);
        if (`${ PARSED_ID }` !== id) {
            res.status(400).json({ message: 'Invalid id provided' });
            return;
        }
        next();
    };
};