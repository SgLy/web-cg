"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var Static = require("koa-static");
var cors = require("koa-cors");
var bodyParser = require("koa-bodyparser");
var path = require("path");
var controller_1 = require("./controller");
var routes_1 = require("./routes");
var app = new Koa();
app.use(bodyParser());
var clientDir = path.join(__dirname, '..', 'client');
app.use(Static(clientDir));
if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line no-console
    console.warn('Development mode detected, CORS enabled');
    app.use(cors({
        origin: 'http://localhost:8000',
        credentials: true,
    }));
}
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // tslint:disable-next-line no-console
                console.log("[Server] " + new Date().toLocaleString() + " " + ctx.method + " " + ctx.url);
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.use(controller_1.sessionMiddleware);
app
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
var server;
exports.startServer = function (port) {
    if (port === void 0) { port = 3000; }
    server = app.listen(port, function () {
        // tslint:disable-next-line no-console
        console.info("[Server] Listening " + port);
    });
};
exports.stopServer = function () {
    // tslint:disable-next-line no-console
    console.info('[Server] Stopping');
    server.close();
};
//# sourceMappingURL=index.js.map