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
    path: '/api/course/list/:offset',
    controller: Controller.Course.list,
  },
  {
    method: 'post',
    path: '/api/course/:courseId/register',
    controller: Controller.Course.register,
  },
  {
    method: 'get',
    path: '/api/assignment/list',
    controller: Controller.Assignment.listByUser,
  },
  {
    method: 'get',
    path: '/api/course/:courseId/assignments',
    controller: Controller.Assignment.listByCourse,
  },
  {
    method: 'post',
    path: '/api/assignment/:assignmentId/submit',
    controller: Controller.Assignment.submit,
  },
  {
    method: 'post',
    path: '/api/user/login',
    controller: Controller.User.login,
  },
  {
    method: 'post',
    path: '/api/user/register',
    controller: Controller.User.register,
  },
  {
    method: 'get',
    path: '/api/user/me',
    controller: Controller.User.me,
  },
  {
    method: 'get',
    path: '/api/work/list',
    controller: Controller.Work.getWorkList,
  },
  {
    method: 'get',
    path: '/api/work/:workId',
    controller: Controller.Work.getWork,
  },
  {
    method: 'post',
    path: '/api/work/code/:codeId/update',
    controller: Controller.Work.updateCodeContent,
  },
  {
    method: 'post',
    path: '/api/work/:workId/code/new',
    controller: Controller.Work.addCode,
  },
  {
    method: 'post',
    path: '/api/work/code/:codeId/delete',
    controller: Controller.Work.deleteCode,
  },
  {
    method: 'get',
    path: '/api/work/:workId/compiled',
    controller: Controller.Core.compiled,
  },
  {
    method: 'get',
    path: '/api/work/:workId/raw',
    controller: Controller.Core.raw,
  },
  {
    method: 'post',
    path: '/api/work/new',
    controller: Controller.Work.newWork,
  },
];

export default routes;
