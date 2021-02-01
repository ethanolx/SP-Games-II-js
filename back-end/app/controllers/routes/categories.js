// Dependencies
import express from 'express';

// Middleware
import verifyData from '../../middleware/verify-data.js';
import verifyId from '../../middleware/verify-id.js';

// Model
import Categories from '../../models/Categories.js';

/**@type {express.Router} */
const router = express.Router();

// Route Handlers
router.route('/category')
    .get((req, res) => {
        Categories.findAll((err, results) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(results);
            }
        });
    })
    .post(verifyData({
        catname: 'string',
        description: 'string'
    }), (req, res) => {
        /**@type {import('../../models/Categories.js').Category} */
        const CATEGORY = req.body;
        Categories.insert(CATEGORY, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The category \'${ CATEGORY.catname }\' already exists` });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(204);
            }
        });
    });

router.route('/category/:id')
    .all(verifyId('params', 'id'))
    .put(verifyData({
        catname: 'string',
        description: 'string'
    }), (req, res) => {
        /**@type {import('../../models/Categories.js').Category} */
        const CATEGORY = req.body;
        const { id } = req.params;
        const categoryid = parseInt(id);
        Categories.update(CATEGORY, categoryid, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The category \'${ CATEGORY.catname }\' already exists` });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(204);
            }
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Categories.delete(parseInt(id), (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

export default router;