"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
var API = /** @class */ (function () {
    function API() {
        this.conn = database_1.createConnection();
    }
    return API;
}());
exports.default = API;
//# sourceMappingURL=index.js.map