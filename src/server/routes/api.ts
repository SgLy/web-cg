import { IMiddleware } from 'koa-router';

import * as Controller from '../controller';

interface IRoute {
  method: 'get' | 'post';
  path: string | RegExp;
  controller: IMiddleware;
}

const routes: IRoute[] = [
  {
    method: 'post',
    path: '/api/user/login',
    controller: Controller.login,
  },
  {
    method: 'get',
    path: '/api/user/me',
    controller: Controller.me,
  },
  {
    method: 'get',
    path: '/api/work/list',
    controller: Controller.getWorkList,
  },
  {
    method: 'get',
    path: '/api/work/:workId',
    controller: Controller.getWork,
  },
  {
    method: 'post',
    path: '/api/work/code/:codeId/update',
    controller: Controller.updateCodeContent,
  },
  {
    method: 'post',
    path: '/api/work/:workId/code/new',
    controller: Controller.addCode,
  },
  {
    method: 'post',
    path: '/api/work/code/:codeId/delete',
    controller: Controller.deleteCode,
  },
  {
    method: 'get',
    path: '/api/work/:workId/compiled',
    controller: Controller.compiled,
  },
  {
    method: 'post',
    path: '/api/work/new',
    controller: Controller.newWork,
  },
];

export default routes;
