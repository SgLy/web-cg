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

export const getWork: IMiddleware = async (ctx, next) => {
  const work = await DB.Work.getWork(ctx.params.workId);
  ctx.body = JSON.stringify({
    success: 1,
    ...work,
  });
};

export const updateCodeContent: IMiddleware = async (ctx, next) => {
  ctx.body = JSON.stringify(await DB.Work.updateCodeContent(
    ctx.params.codeId, ctx.request.body.content,
  ));
};

export const addCode: IMiddleware = async (ctx, next) => {
  const result = await DB.Work.addCode(
    ctx.params.workId,
    ctx.request.body.filename,
    ctx.request.body.type,
  );
  ctx.body = JSON.stringify(result);
};

export const deleteCode: IMiddleware = async (ctx, next) => {
  ctx.body = JSON.stringify(await DB.Work.deleteCode(ctx.params.codeId));
};

export const getWorkList: IMiddleware = async (ctx, next) => {
  ctx.body = JSON.stringify(await DB.Work.getWorkList(ctx.params.userId));
};

export const newWork: IMiddleware = async (ctx, next) => {
  ctx.body = JSON.stringify(await DB.Work.newWork(
    ctx.request.body.name,
    ctx.request.body.userId,
  ));
};

export { compiled } from './core';
export { sessionMiddleware } from './session';
