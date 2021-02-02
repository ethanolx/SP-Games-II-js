// Server Config
const HOST = 'localhost';
const PORT = 5000;
const TEST_PORT = 12345;

// Front-End Server Config
const FRONT_END_HOST = HOST;
const FRONT_END_PORT = 3000;

// Log Files Config
const MAX_ERROR_LOGS = 8;
const MAX_HISTORY_LOGS = 15;

// Image Upload Restrictions
const MAX_FILE_SIZE = 2000000;
const MEDIA_TYPES_SUPPORTED = ['.jpg', '.png', '.jpeg', '.JPG'];

export { HOST, PORT, TEST_PORT, FRONT_END_HOST, FRONT_END_PORT, MAX_ERROR_LOGS, MAX_HISTORY_LOGS, MAX_FILE_SIZE, MEDIA_TYPES_SUPPORTED };