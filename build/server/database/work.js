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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function getWork(id) {
    return __awaiter(this, void 0, void 0, function () {
        var works, ret, codes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('SELECT * FROM work WHERE id = ?', [id])];
                case 1:
                    works = _a.sent();
                    ret = {
                        id: works[0].id,
                        userId: works[0].user_id,
                        public: works[0].public,
                        codes: [],
                    };
                    return [4 /*yield*/, index_1.query('SELECT * FROM code WHERE work_id = ?', [id])];
                case 2:
                    codes = _a.sent();
                    codes.forEach(function (c) {
                        ret.codes.push({
                            id: c.id,
                            filename: c.filename,
                            content: c.content,
                            type: c.type,
                        });
                    });
                    return [2 /*return*/, ret];
            }
        });
    });
}
exports.getWork = getWork;
function newWork(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var q, data, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    q = 'INSERT INTO work (user_id) VALUES (?)';
                    data = [userId];
                    return [4 /*yield*/, index_1.query('INSERT INTO work (user_id) VALUES (?)', [userId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1, id: result }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.newWork = newWork;
function makePublic(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('UPDATE work SET public = TRUE WHERE id = ?', [id])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.makePublic = makePublic;
function cancelPublic(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('UPDATE work SET public = FALSE WHERE id = ?', [id])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.cancelPublic = cancelPublic;
function addCode(workId, filename, type) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('INSERT INTO code (work_id, filename, type, content) VALUES (?, ?, ?, "")', [workId, filename, type])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1, codeId: result.insertId }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.addCode = addCode;
function updateCodeContent(codeId, content) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('UPDATE code SET content = ? WHERE id = ?', [content, codeId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateCodeContent = updateCodeContent;
function updateCodeFilename(codeId, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('UPDATE code SET filename = ? WHERE id = ?', [filename, codeId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateCodeFilename = updateCodeFilename;
function deleteCode(codeId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM code WHERE id = ?', [codeId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    else
                        return [2 /*return*/, { success: 0 }];
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteCode = deleteCode;
//# sourceMappingURL=work.js.map