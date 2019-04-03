import * as mysql from 'mysql';
import DATABASE_CONFIG from './config';

import * as Work from './work';
import * as User from './user';
import * as Course from './course';
import * as Assignment from './assignment';

const config = Object.assign({}, DATABASE_CONFIG, {
  connectionLimit: 10,
});
const pool = mysql.createPool(config);

interface IResult extends Array<any> {
  affectedRows?: number;
  insertId?: number;
}

export const query = async (queryString: string, values: any[]) => {
  return new Promise<IResult>((resolve, reject) => {
    pool.query(queryString, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const EXPORTS = {
  Work,
  User,
  Course,
  Assignment,
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
          // tslint:disable-next-line no-console
          console.error(`[ERROR] ${e}`);
          return { success: 0 };
        }
      };
    });
  });
  return res;
};

export default exceptionWrapper(EXPORTS) as typeof EXPORTS;
