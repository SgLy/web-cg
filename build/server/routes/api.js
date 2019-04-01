"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = require("../controller");
var routes = [
    {
        method: 'post',
        path: '/api/user/login',
        controller: Controller.login,
    },
    {
        method: 'get',
        path: '/api/work/:workId',
        controller: Controller.getWork,
    },
    {
        method: 'get',
        path: '/api/work/list/:userId',
        controller: Controller.getWorkList,
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
exports.default = routes;
//# sourceMappingURL=api.js.map