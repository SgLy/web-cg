import DB from '../database';
import { IMiddleware } from 'koa-router';

export const getWork: IMiddleware = async (ctx, next) => {
  const work = await DB.Work.getWork(ctx.params.id);
  ctx.body = JSON.stringify({
    success: 1,
    ...work,
  });
};
