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
var fs_1 = require("fs");
var path = require("path");
var htmlTemplate = fs_1.readFileSync(path.join(__dirname, 'template.html')).toString();
var hostname = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://cn.sgly.cf';
var getScript = function (workId, entry) { return __awaiter(_this, void 0, void 0, function () {
    var work, JSs, listeners, requireCode, GLSLs, glCode, GLSLcode, loopCode, userCode, communicationCode, shadowedGlobals, wrapped;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.default.Work.getWork(workId)];
            case 1:
                work = _a.sent();
                if (work === undefined)
                    return [2 /*return*/, ''];
                JSs = work.codes.filter(function (c) { return c.type === 'javascript' && c.filename !== entry; });
                listeners = "\n    const addOnResizeListener = listener => {\n      window.addEventListener('resize', () => {\n        listener();\n      });\n    };\n    const addOnKeyPressedListener = (key, listener) => {\n      window.addEventListener('keypress', e => {\n        if (e.key === key.toLowerCase()) listener();\n      });\n    };\n    const addMouseMoveListener = listener => {\n      window.addEventListener('mousemove', e => {\n        listener({\n          x: e.movementX,\n          y: e.movementY,\n        });\n      });\n    };\n  ";
                requireCode = "const require = (() => {\n    const cache = {};\n    return (filename) => {" + JSs.map(function (c) { return "\n        if (filename === '" + c.filename + "') {\n          if (cache['" + c.filename + "']) return cache['" + c.filename + "'];\n          const module = {};\n          (() => { " + c.content + " })();\n          cache['" + c.filename + "'] = module.exports;\n          return cache['" + c.filename + "'];\n        }\n      "; }).join('') + "\n      return undefined;\n    };\n  })()";
                GLSLs = work.codes.filter(function (c) { return c.type === 'glsl'; });
                glCode = "\n    const gl = document.getElementById('canvas').getContext('webgl2');\n  ";
                GLSLcode = "const requireGLSL = (filename) => {" + GLSLs.map(function (c) { return "\n      if (filename === '" + c.filename + "') return `" + c.content + "`;\n    "; }).join('') + "\n    return '';\n  }";
                loopCode = "\n    (() => {\n      let lastTime = 0;\n      const loop = time => {\n        if (mainLoop) mainLoop(time);\n        if (time !== 0) updateFPS(1000 / (time - lastTime));\n        lastTime = time;\n        requestAnimationFrame(loop);\n      }\n      try { loop(0); } catch (e) {\n        console.log(e);\n      }\n    })();\n  ";
                userCode = work.codes.find(function (c) { return c.filename === entry; }).content;
                communicationCode = "\n    const updateFPS = fps => {\n      parent.window.postMessage({\n        action: 'updateFPS',\n        data: {\n          fps,\n        },\n      }, '" + hostname + "');\n    };\n    window.addEventListener('message', e => {\n      if (e.data.action === 'lockMouse') {\n        document.getElementById('canvas').requestPointerLock();\n      }\n    }, false);\n    document.addEventListener('pointerlockchange', () => {\n      if (document.pointerLockElement === document.getElementById('canvas')) {\n        return;\n      }\n      parent.window.postMessage({\n        action: 'mouseUnlock',\n      }, '" + hostname + "');\n    }, false);\n    Object.keys(console).map(f => {\n      const func = console[f];\n      console[f] = function(...args) {\n        parent.window.postMessage({\n          action: 'console.' + f,\n          data: args,\n        }, '" + hostname + "');\n      };\n    });\n  ";
                shadowedGlobals = [
                    'window',
                    'document',
                    'top',
                    'parent',
                    'frames',
                    'location',
                    'self',
                    'customElements',
                    'history',
                    'locationbar',
                    'menubar',
                    'personalbar',
                    'scrollbars',
                    'statusbar',
                    'toolbar',
                    'navigator',
                    'origin',
                    'screen',
                    'innerHeight',
                    'innerWidth',
                    'visualViewport',
                    'screenX',
                    'screenY',
                    'screenLeft',
                    'screenTop',
                    'outerWidth',
                    'outerHeight',
                    'devicePixelRatio',
                    'clientInformation',
                    'styleMedia',
                    'isSecureContext',
                    'performance',
                    'crypto',
                    'indexedDB',
                    'webkitStorageInfo',
                    'sessionStorage',
                    'localStorage',
                    'chrome',
                    'speechSynthesis',
                    'applicationCache',
                    'caches',
                ];
                wrapped = "\n    (function (requestAnimationFrame, updateFPS, " + shadowedGlobals.join(', ') + ") {\n      " + [userCode, loopCode].join('\n') + "\n    }).bind({})(window.requestAnimationFrame, updateFPS);\n  ";
                return [2 /*return*/, [
                        listeners,
                        glCode,
                        requireCode,
                        GLSLcode,
                        communicationCode,
                        wrapped,
                    ].join('\n')];
        }
    });
}); };
exports.compiled = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var src;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getScript(ctx.params.workId, 'index.js')];
            case 1:
                src = _a.sent();
                ctx.body = htmlTemplate.replace('{% script %}', src);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=core.js.map