import * as mysql from 'mysql';
import DATABASE_CONFIG from './config';

export const createConnection = () => mysql.createConnection(DATABASE_CONFIG);
