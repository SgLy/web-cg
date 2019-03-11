"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
function madeTemplate() {
    var html = fs_1.readFileSync(path.join(__dirname, 'template.html')).toString();
    var js = fs_1.readFileSync(path.join(__dirname, 'test.js')).toString();
    html = html.replace('{% script %}', js);
    return html;
}
exports.default = madeTemplate;
//# sourceMappingURL=index.js.map