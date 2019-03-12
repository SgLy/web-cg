import * as Koa from 'koa';
import * as Static from 'koa-static';
import * as cors from 'koa-cors';
import * as bodyParser from 'koa-bodyparser';

import { Server } from 'http';
import * as path from 'path';
import router from './routes';

const app = new Koa();
app.use(bodyParser());

const clientDir = path.join(__dirname, '..', 'client');

app.use(Static(clientDir));

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line no-console
  console.warn('Development mode detected, CORS enabled');
  app.use(cors());
}

app.use(async (ctx, next) => {
  // tslint:disable-next-line no-console
  console.log(`[Server] ${new Date().toLocaleString()} ${ctx.method} ${ctx.url}`);
  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

let server: Server;
export const startServer = (port = 3000) => {
  server = app.listen(port, () => {
    // tslint:disable-next-line no-console
    console.info(`[Server] Listening ${port}`);
  });
};

export const stopServer = () => {
  // tslint:disable-next-line no-console
  console.info('[Server] Stopping');
  server.close();
};
