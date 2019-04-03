import DB from '../database';
import { IMiddleware } from 'koa-router';
import { assignCookie, setCookie } from './session';

export const login: IMiddleware = async (ctx, next) => {
  const user = await DB.User.login(
    ctx.request.body.phone, ctx.request.body.password,
  );
  if (user.success === 1) {
    assignCookie(user.id);
    setCookie(ctx, user.id);
  }
  ctx.body = JSON.stringify(user);
};

export const register: IMiddleware = async (ctx, next) => {
  const user = await DB.User.register(
    ctx.request.body.phone, ctx.request.body.password,
  );
  if (user.success === 1) {
    assignCookie(user.id!);
    setCookie(ctx, user.id!);
  }
  ctx.body = JSON.stringify(user);
};

export const me: IMiddleware = async (ctx, next) => {
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(
      await DB.User.get(ctx.request.body.userId),
    );
  } else {
    ctx.body = JSON.stringify({ success: 0 });
  }
};
