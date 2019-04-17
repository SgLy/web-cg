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

export const update: IMiddleware = async (ctx, next) => {
  const user = await DB.User.loginById(
    ctx.params.userId, ctx.request.body.originalPassword,
  );
  if (user.success !== 1) {
    ctx.body = JSON.stringify({ success: 0 });
    return;
  }
  const promises = [DB.User.update(
    ctx.params.userId,
    ctx.request.body.studentId,
    ctx.request.body.nickname,
    ctx.request.body.realname,
    ctx.request.body.gender,
  )];
  if (ctx.request.body.password !== '') {
    promises.push(DB.User.updatePassword(
      ctx.params.userId,
      ctx.request.body.password,
    ));
  }
  const results = await Promise.all(promises);
  const ret: { [key: string]: number } = {
    successInfo: results[0].success,
  };
  if (results.length > 1) ret.successPassword = results[1].success;
  ctx.body = JSON.stringify(ret);
};
