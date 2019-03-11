import * as mysql from 'mysql';

export const createConnection = () => mysql.createConnection({
    host: '',
    port: 0,
    user: '',
    password: '',
    database: '',
  });
