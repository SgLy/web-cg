import { IMiddleware } from 'koa-router';
import madeTemplate from './core';

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
      ctx.body = madeTemplate();
    },
  },
];

export default routes;
