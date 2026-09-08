import { config } from './config.js';

export const db = createDbClient(config.DATABASE_URL);