import { ComposedMiddleware } from 'koa-compose';
import * as Koa from 'koa';
import * as UUID from 'uuid';
import * as isUUID from 'is-uuid';

const session: { [sid: string]: number } = {};

const parseCookie = (ctx: Koa.Context) => {
  ctx.request.body.login = false;
  const sid = ctx.cookies.get('sid');
  if (!sid || !isUUID.v4(sid)) return;
  if (session[sid] === undefined) return;
  // tslint:disable-next-line no-console
  console.log(`[Session] ${session[sid]} (${sid})`);
  ctx.request.body.login = true;
  ctx.request.body.userId = session[sid];
};

export const setCookie = (ctx: Koa.Context, userId: number) => {
  const sid = Object.keys(session).find(s => session[s] === userId);
  if (!sid) return;
  ctx.cookies.set('sid', sid, {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
    overwrite: false,
  });
};

export const assignCookie = (userId: number) => {
  let sid = UUID.v4();
  while (session[sid] !== undefined) sid = UUID.v4();
  session[sid] = userId;
  return sid;
};

export const cleanCookieByUserId = (userId: number) => {
  const sid = Object.keys(session).find(s => session[s] === userId);
  if (!sid) return;
  delete session[sid];
};

export const cleanCookieBySid = (sid: string) => {
  if (session[sid] === undefined) return;
  if (!isUUID.v4(sid)) return;
  delete session[sid];
};

export const sessionMiddleware: ComposedMiddleware<Koa.Context> = async (ctx, next) => {
  parseCookie(ctx);
  if (next) await next();
};
