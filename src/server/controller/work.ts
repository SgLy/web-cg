import DB from '../database';
import { IMiddleware } from 'koa-router';

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
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(
      await DB.Work.getWorkList(ctx.request.body.userId),
    );
  } else {
    ctx.body = JSON.stringify({ success: 0 });
  }
};

export const newWork: IMiddleware = async (ctx, next) => {
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(await DB.Work.newWork(
      ctx.request.body.name,
      ctx.request.body.userId,
    ));
  } else {
    ctx.body = JSON.stringify({ success: 0 });
  }
};