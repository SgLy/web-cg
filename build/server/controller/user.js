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
var database_1 = require("../database");
var session_1 = require("./session");
exports.login = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.User.login(ctx.request.body.phone, ctx.request.body.password)];
            case 1:
                user = _a.sent();
                if (user.success === 1) {
                    session_1.assignCookie(user.id);
                    session_1.setCookie(ctx, user.id);
                }
                ctx.body = JSON.stringify(user);
                return [2 /*return*/];
        }
    });
}); };
exports.register = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.User.register(ctx.request.body.phone, ctx.request.body.password)];
            case 1:
                user = _a.sent();
                if (user.success === 1) {
                    session_1.assignCookie(user.id);
                    session_1.setCookie(ctx, user.id);
                }
                ctx.body = JSON.stringify(user);
                return [2 /*return*/];
        }
    });
}); };
exports.me = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.request.body.login) return [3 /*break*/, 2];
                _a = ctx;
                _c = (_b = JSON).stringify;
                return [4 /*yield*/, database_1.default.User.get(ctx.request.body.userId)];
            case 1:
                _a.body = _c.apply(_b, [_d.sent()]);
                return [3 /*break*/, 3];
            case 2:
                ctx.body = JSON.stringify({ success: 0 });
                _d.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, promises, results, ret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.User.loginById(ctx.params.userId, ctx.request.body.originalPassword)];
            case 1:
                user = _a.sent();
                if (user.success !== 1) {
                    ctx.body = JSON.stringify({ success: 0 });
                    return [2 /*return*/];
                }
                promises = [database_1.default.User.update(ctx.params.userId, ctx.request.body.studentId, ctx.request.body.nickname, ctx.request.body.realname, ctx.request.body.gender)];
                if (ctx.request.body.password !== '') {
                    promises.push(database_1.default.User.updatePassword(ctx.params.userId, ctx.request.body.password));
                }
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                results = _a.sent();
                ret = {
                    successInfo: results[0].success,
                };
                if (results.length > 1)
                    ret.successPassword = results[1].success;
                ctx.body = JSON.stringify(ret);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=user.js.map