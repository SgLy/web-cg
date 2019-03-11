import { createConnection } from '../database';
import { Connection } from 'mysql';

class API {
  private conn: Connection;

  constructor() {
    this.conn = createConnection();
  }
}

export default API;
