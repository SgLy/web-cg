"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var js = fs_1.readFileSync(path.join(__dirname, 'test.js')).toString();
function updateCode(code) {
    js = code;
}
exports.updateCode = updateCode;
function madeTemplate() {
    var html = fs_1.readFileSync(path.join(__dirname, 'template.html')).toString();
    html = html.replace('{% script %}', js);
    return html;
}
exports.madeTemplate = madeTemplate;
exports.getCode = function () { return js; };
//# sourceMappingURL=index.js.map