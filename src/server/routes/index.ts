import * as Router from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';

const router = new Router();

import apiRoutes from './api';
apiRoutes.forEach(({method, path, controller}) => {
  router[method](path, controller);
});

const clientDir = path.join(__dirname, '..', 'client');
router.get('/', async (ctx, next) => {
  const data = fs.readFileSync(path.join(clientDir, 'index.html'));
  ctx.response.type = 'html';
  ctx.response.body = data;
});

export default router;
