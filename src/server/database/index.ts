import * as mysql from 'mysql';
import DATABASE_CONFIG from './config';

import * as Work from './work';
import * as User from './user';

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

const EXPORTS = {
  Work,
  User,
};

// @ts-ignore
const exceptionWrapper = exported => {
  const res: {} = {};
  Object.keys(exported).map(category => {
    // @ts-ignore
    res[category] = {};
    Object.keys(exported[category]).map(f => {
      const func = exported[category][f];
      // @ts-ignore
      res[category][f] = async (...args) => {
        try {
          return await func(...args);
        } catch (e) {
          return { success: 0 };
        }
      };
    });
  });
  return res;
};

export default exceptionWrapper(EXPORTS) as typeof EXPORTS;
