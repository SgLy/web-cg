"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
exports.createConnection = function () { return mysql.createConnection({
    host: '',
    port: 0,
    user: '',
    password: '',
    database: '',
}); };
//# sourceMappingURL=index.js.map