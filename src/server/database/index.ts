import * as mysql from 'mysql';
import DATABASE_CONFIG from './config';

import * as Work from './work';

const config = Object.assign({}, DATABASE_CONFIG, {
  connectionLimit: 10,
});
const pool = mysql.createPool(config);

export const query = async (queryString: string, values: any[]) => {
  return new Promise<any>((resolve, reject) => {
    pool.query(queryString, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export default {
  Work,
};
