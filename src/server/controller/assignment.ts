import DB from '../database';
import { IMiddleware } from 'koa-router';

export const listByUser: IMiddleware = async (ctx, next) => {
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(
      await DB.Assignment.listByUser(ctx.request.body.userId),
    );
  } else {
    ctx.body = JSON.stringify({ success: 0 });
  }
};

export const listByCourse: IMiddleware = async (ctx, next) => {
  ctx.body = JSON.stringify(
    await DB.Assignment.listByCourse(ctx.params.courseId),
  );
};
