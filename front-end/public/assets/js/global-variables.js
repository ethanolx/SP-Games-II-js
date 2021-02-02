/** @type {User} */
let GLOBAL_USER;

/** @type {((game: Game) => boolean)[]} */
let conditions = [];

/** @type {'date' | 'rating' | 'user'} */
let reviewsSortCondition = 'date';

/** @type {'asc' | 'dsc'} */
let reviewsSortOrder = 'asc';

// Configurations
const BACK_END_HOST = 'localhost';
const BACK_END_PORT = 5000;