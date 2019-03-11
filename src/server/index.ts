import * as Koa from 'koa';
import * as Static from 'koa-static';
import { Server } from 'http';
import * as path from 'path';
import router from './routes';

const app = new Koa();

const clientDir = path.join(__dirname, '..', 'client');

app.use(Static(clientDir));

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
