// import { config } from './config.js';

// export const db = createDbClient(config.DATABASE_URL);

import { Pool } from 'pg';
import { config } from './config.js';

export const db = new Pool({
  connectionString: config.DATABASE_URL,
});