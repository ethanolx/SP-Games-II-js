// Imports
import query from '../utils/query.js';

/**
 * Object representing a gaming platform
 * @typedef {Object} Platform
 * @property {string} platform          - Generic platform (i.e. Xbox, PC, Mobile)
 * @property {string} version           - More specific platform type (i.e. Xbox One, Mobile iOS)
 */

export default {
    /**
     * Find the id(s) of the selected platform(s)
     * @param {Platform} platform
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findIds: (platform, callback) => {
        const GET_PLATFORM_ID_SQL = 'SELECT id FROM platforms WHERE platform = ? AND (ISNULL(?) OR version = ?);';
        query(GET_PLATFORM_ID_SQL, callback, [platform.platform, platform.version, platform.version]);
    },

    /**
     * Find the platforms supported for a selected game
     * @param {number} gameid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findByGame: (gameid, callback) => {
        const GET_ALL_PLATFORMS_BY_GAME_SQL = 'SELECT platforms.id AS pid, platform, version FROM game_platform_asc INNER JOIN platforms ON game_platform_asc.platformid = platforms.id WHERE game_platform_asc.gameid = ?;';
        query(GET_ALL_PLATFORMS_BY_GAME_SQL, callback, gameid);
    },

    /**
     * Find all platforms
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    findAll: (callback) => {
        const GET_ALL_PLATFORMS_SQL = 'SELECT * FROM platforms;';
        query(GET_ALL_PLATFORMS_SQL, callback);
    },

    /**
     * Create a new platform
     * @param {Platform} PLATFORM
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    insert: (PLATFORM, callback) => {
        const CREATE_NEW_PLATFORM_SQL = 'INSERT INTO platforms (platform, version) VALUES (?);';
        const { platform, version } = PLATFORM;
        query(CREATE_NEW_PLATFORM_SQL, callback, [[platform, version]]);
    },

    /**
     * Edit an existing category
     * @param {Platform} PLATFORM
     * @param {number} pid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    update: (PLATFORM, pid, callback) => {
        const UPDATE_EXISTING_PLATFORM_SQL = 'UPDATE platforms SET ? WHERE id = ?;';
        query(UPDATE_EXISTING_PLATFORM_SQL, callback, [PLATFORM, pid]);
    },

    /**
     * Remove an existing platform
     * @param {number} pid
     * @param {import('../utils/callbacks.js').Callback} callback
     */
    delete: (pid, callback) => {
        const DELETE_PLATFORM_SQL = 'DELETE FROM platforms WHERE id = ?;';
        query(DELETE_PLATFORM_SQL, callback, pid)
    }
};