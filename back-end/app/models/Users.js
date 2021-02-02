// Imports
import query from '../utils/query.js';
import jwt from 'jsonwebtoken';
import KEY from '../config/secret-key.js';
import { emptyCallback } from '../utils/callbacks.js';
import QueryError from '../utils/custom-error.js';
/**
 * Object representing each user
 * @typedef {Object} User
 * @property {number} [userid]              - ID of a user
 * @property {string} [username]            - Username of a user
 * @property {string} [email]               - User's email
 * @property {string} [password]            - User's password
 * @property {'Admin' | 'Customer'} [type]  - Type of a user (either Admin or Customer)
 * @property {string} [profile_pic_url]     - URL to a user's profile pic (optional)
 */

export default {

    /**
     * Find all users
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findAll: (callback) => {
        const GET_ALL_USERS_SQL = 'SELECT * FROM users;';
        query(GET_ALL_USERS_SQL, callback);
    },

    /**
     * Find one user by id
     * @param {number} userID
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findOne: (userID, callback) => {
        const GET_ONE_USER_BY_ID_SQL = 'SELECT * FROM users WHERE userid = ?;';
        query(GET_ONE_USER_BY_ID_SQL, callback, userID);
    },

    /**
     * Create a new user
     * @param {User} user
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (user, callback) => {
        const CREATE_NEW_USER_SQL = 'INSERT INTO users (username, email, password, profile_pic_url) VALUES (?);';
        const { username, email, password, profile_pic_url } = user;
        query(CREATE_NEW_USER_SQL, callback, [[username, email, password, profile_pic_url]]);
    },

    /**
     * Update a user's profile
     * @param {number} userid
     * @param {User} user
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (userid, user, callback) => {
        const UPDATE_EXISTING_USER_SQL = 'UPDATE users SET ? WHERE userid = ?;';
        query(UPDATE_EXISTING_USER_SQL, callback, [user, userid]);
    },

    /**
     * Login a user
     * @param {string} username_or_email
     * @param {string} password
     * @param {(err: import('mysql2').QueryError, result: string | null) => void} callback
     */
    login: (username_or_email, password, callback) => {
        const LOGIN_USER_SQL = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?;';
        query(LOGIN_USER_SQL, emptyCallback, [username_or_email, username_or_email, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            else if (result instanceof Array && result.length === 1) {
                /** @type {User} */
                // @ts-ignore
                const user = result[0];
                const token = jwt.sign({ id: user.userid, type: user.type }, KEY, {
                    expiresIn: 86400
                });
                delete user['password'];
                return callback(null, token);
            }
            else {
                /** @type {import('mysql2').QueryError} */
                var er = new QueryError("Username/Email/Password does not match.", "custom");
                return callback(er, null);
            }
        });
    }
};