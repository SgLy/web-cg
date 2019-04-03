import DB from '../database';
import { IMiddleware } from 'koa-router';

export const list: IMiddleware = async (ctx, next) => {
  const offset = parseInt(ctx.params.offset, 10);
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(
      await DB.Course.listWithUser(offset, ctx.request.body.userId),
    );
  } else {
    ctx.body = JSON.stringify(
      await DB.Course.list(offset),
    );
  }
};

export const register: IMiddleware = async (ctx, next) => {
  if (ctx.request.body.login) {
    ctx.body = JSON.stringify(
      await DB.Course.registerCourse(
        ctx.request.body.userId,
        ctx.params.courseId,
      ),
    );
  } else {
    ctx.body = JSON.stringify({ success: 0 });
  }
};
