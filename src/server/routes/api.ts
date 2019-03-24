import { IMiddleware } from 'koa-router';

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
    path: '/api/work/get_work/:workId',
    controller: Controller.getWork,
  },
  {
    method: 'post',
    path: '/api/work/update_code/:codeId',
    controller: Controller.updateCodeContent,
  },
  {
    method: 'post',
    path: '/api/work/:workId/new_code',
    controller: Controller.addCode,
  },
  {
    method: 'post',
    path: '/api/work/delete_code/:codeId/',
    controller: Controller.deleteCode,
  },
  {
    method: 'get',
    path: '/api/compiled/:workId',
    controller: Controller.compiled,
  },
];

export default routes;
