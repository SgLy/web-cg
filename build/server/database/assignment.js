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
function add(courseId, name, description, deadline) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('INSERT INTO assignment (course_id, name, description, deadline) VALUES (?, ?, ?)', [courseId, name, description, deadline])];
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
function remove(assignmentId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM assignment WHERE id = ?', [assignmentId])];
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
function submit(userId, workId, assignmentId, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('DELETE FROM submission WHERE user_id = ? AND assignment_id = ?', [userId, assignmentId])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, index_1.query('INSERT INTO submission (user_id, work_id, assignment_id, submit_time) VALUES (?, ?, FROM_UNIXTIME(?))', [userId, workId, assignmentId, timestamp])];
                case 2:
                    result = _a.sent();
                    if (result.affectedRows === 1)
                        return [2 /*return*/, { success: 1 }];
                    return [2 /*return*/, { success: 0 }];
            }
        });
    });
}
exports.submit = submit;
function listByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query("\n    SELECT\n      assignment.*,\n      course.id AS course_id,\n      course.name AS course_name,\n      course.description AS course_description,\n      course.teacher AS course_teacher\n    FROM assignment\n    RIGHT JOIN (\n      SELECT course_id FROM course_reg\n      WHERE user_id = ?\n    ) AS my_course\n    ON my_course.course_id = assignment.course_id\n    LEFT JOIN course\n    ON course.id = assignment.course_id", [userId])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            success: 1,
                            assignments: result.map(function (r) { return ({
                                id: r.id,
                                name: r.name,
                                deadline: r.deadline,
                                description: r.description,
                                course: {
                                    id: r.course_id,
                                    name: r.course_name,
                                    description: r.course_description,
                                    teacher: r.course_teacher,
                                },
                            }); }),
                        }];
            }
        });
    });
}
exports.listByUser = listByUser;
function listByCourse(courseId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.query('SELECT * FROM assignment WHERE course_id = ?', [courseId])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            success: 1,
                            assignments: result.map(function (r) { return ({
                                id: r.id,
                                name: r.name,
                                description: r.description,
                                deadline: r.deadline,
                            }); }),
                        }];
            }
        });
    });
}
exports.listByCourse = listByCourse;
//# sourceMappingURL=assignment.js.map