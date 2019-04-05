"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var crypto_js_1 = require("crypto-js");
exports.getWork = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var work;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.Work.getWork(ctx.params.workId)];
            case 1:
                work = _a.sent();
                ctx.body = JSON.stringify(__assign({ success: 1 }, work));
                return [2 /*return*/];
        }
    });
}); };
exports.updateCodeContent = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.Work.updateCodeContent(ctx.params.codeId, ctx.request.body.content)];
            case 1:
                code = _a.sent();
                if (code.success === 1) {
                    ctx.body = JSON.stringify(__assign({}, code, { hash: crypto_js_1.SHA1(ctx.request.body.content).toString() }));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.addCode = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.Work.addCode(ctx.params.workId, ctx.request.body.filename, ctx.request.body.type)];
            case 1:
                result = _a.sent();
                ctx.body = JSON.stringify(result);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteCode = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = ctx;
                _c = (_b = JSON).stringify;
                return [4 /*yield*/, database_1.default.Work.deleteCode(ctx.params.codeId)];
            case 1:
                _a.body = _c.apply(_b, [_d.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.getWorkList = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.request.body.login) return [3 /*break*/, 2];
                _a = ctx;
                _c = (_b = JSON).stringify;
                return [4 /*yield*/, database_1.default.Work.getWorkList(ctx.request.body.userId)];
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
exports.newWork = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!ctx.request.body.login) return [3 /*break*/, 2];
                _a = ctx;
                _c = (_b = JSON).stringify;
                return [4 /*yield*/, database_1.default.Work.newWork(ctx.request.body.name, ctx.request.body.userId)];
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
//# sourceMappingURL=work.js.map