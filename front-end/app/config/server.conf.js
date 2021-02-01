import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const HTML_ROOT = join(__dirname, '..', '..', 'public');
export const ROOT = join(__dirname, '..', '..', 'public', 'assets');

export const HOST = 'localhost';
export const PORT = 3000;