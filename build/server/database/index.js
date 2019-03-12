"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var config_1 = require("./config");
exports.createConnection = function () { return mysql.createConnection(config_1.default); };
//# sourceMappingURL=index.js.map