import { IMiddleware } from 'koa-router';
import * as core from './core';

import * as Controller from '../controller';

interface IRoute {
  method: 'get' | 'post';
  path: string | RegExp;
  controller: IMiddleware;
}

const routes: IRoute[] = [
  {
    method: 'get',
    path: '/api/1',
    controller: async (ctx, next) => {
      ctx.body = 1;
    },
  },
  {
    method: 'get',
    path: '/api/canvas/1',
    controller: async (ctx, next) => {
      ctx.body = core.madeTemplate();
    },
  },
  {
    method: 'post',
    path: '/api/canvas/update_code',
    controller: async (ctx, next) => {
      core.updateCode(ctx.request.body.code);
      ctx.body = { success: 1 };
    },
  },
  {
    method: 'get',
    path: '/api/work/get_work/:id',
    controller: Controller.getWork,
  },
];

export default routes;
