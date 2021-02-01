// Imports
import compareObjectToSignature from "../utils/compare-object-to-signature.js";
import express from 'express';

/**
 * Validates an object's signature
 *
 * Criterion:
 *  - Signature of object matches specification
 * @param {{}} signature
 * @returns {express.Handler}
 */
export default (signature) => {
    return (req, res, next) => {
        if (!compareObjectToSignature(req.body, signature)) {
            res.status(400).json({ message: 'Request body has missing attributes' });
            return;
        }
        next();
    }
};
