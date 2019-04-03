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
function list(offset) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('SELECT * FROM course ORDER BY id LIMIT 10 OFFSET ?', [offset])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            success: 1,
                            courses: result.map(function (r) { return ({
                                id: r.id,
                                name: r.name,
                                description: r.description,
                                teacher: r.teacher,
                            }); }),
                        }];
            }
        });
    });
}
exports.list = list;
function listWithUser(offset, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query("\n      SELECT * FROM course\n      LEFT JOIN (\n        SELECT course_id, TRUE AS registered FROM course_reg\n        WHERE user_id = ?\n      ) AS my_course\n      ON course.id = my_course.course_id\n      ORDER BY id LIMIT 10 OFFSET ?\n    ", [userId, offset])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            success: 1,
                            courses: result.map(function (r) { return ({
                                id: r.id,
                                name: r.name,
                                description: r.description,
                                teacher: r.teacher,
                                registered: !!r.registered,
                            }); }),
                        }];
            }
        });
    });
}
exports.listWithUser = listWithUser;
function registerCourse(userId, courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('INSERT INTO course_reg (user_id, course_id) VALUES (?, ?)', [userId, courseId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.registerCourse = registerCourse;
function unregisterCourse(userId, courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM course_reg WHERE user_id = ? AND course_id = ?', [userId, courseId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.unregisterCourse = unregisterCourse;
function setCourseTA(userId, courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('INSERT INTO course_ta (user_id, course_id) VALUES (?, ?)', [userId, courseId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.setCourseTA = setCourseTA;
function unsetCourseTA(userId, courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM course_ta WHERE user_id = ? AND course_id = ?', [userId, courseId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.unsetCourseTA = unsetCourseTA;
function add(name, description, teacher) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('INSERT INTO course (name, description, teacher) VALUES (?, ?, ?)', [name, description, teacher])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.add = add;
function remove(courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM course WHERE id = ?', [courseId])];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=course.js.map