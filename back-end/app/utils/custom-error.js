export default class QueryError extends Error {
    /**
     *
     * @param {string} message
     * @param {string} code
     */
    constructor(message, code) {
        super(message);
        this.code = code;
        this.fatal = false;
    }
}