// Imports
import compareObjectToSignature from "../utils/compare-object-to-signature.js";
import express from 'express';

/**
 * Validates an object's signature
 *
 * Criterion:
 *  - Signature of object matches specification
 * @param {{}} body
 * @param {{}} signature
 * @returns {express.Handler}
 */
export default (body, signature) => {
    return (req, res, next) => {
        if (!compareObjectToSignature(body, signature)) {
            res.status(400).json({ message: 'Request body has missing attributes' });
            return;
        }
        next();
    }
};
