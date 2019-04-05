import DB from '../database';
import { IMiddleware } from 'koa-router';
import { readFileSync } from 'fs';
import * as path from 'path';
import * as JSZip from 'jszip';

const htmlTemplate = readFileSync(path.join(__dirname, 'template.html')).toString();

const hostname = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://cn.sgly.cf';

const getScript = async (workId: number, entry: string) => {
  const work = await DB.Work.getWork(workId);
  if (work === undefined) return '';
  const JSs = work.codes.filter(
    c => c.type === 'javascript' && c.filename !== entry,
  );
  const listeners = `
    const addOnResizeListener = listener => {
      window.addEventListener('resize', () => {
        listener();
      });
    };
    const addOnKeyPressedListener = (key, listener) => {
      window.addEventListener('keypress', e => {
        if (e.key === key.toLowerCase()) listener();
      });
    };
    const addMouseMoveListener = listener => {
      window.addEventListener('mousemove', e => {
        listener({
          x: e.movementX,
          y: e.movementY,
        });
      });
    };
  `;
  const requireCode = `const require = (() => {
    const cache = {};
    return (filename) => {${
      JSs.map(c => `
        if (filename === '${c.filename}') {
          if (cache['${c.filename}']) return cache['${c.filename}'];
          const module = {};
          (() => { ${c.content} })();
          cache['${c.filename}'] = module.exports;
          return cache['${c.filename}'];
        }
      `).join('')}
      return undefined;
    };
  })()`;
  const GLSLs = work.codes.filter(c => c.type === 'glsl');
  const glCode = `
    const gl = document.getElementById('canvas').getContext('webgl2');
  `;
  const GLSLcode = `const requireGLSL = (filename) => {${
    GLSLs.map(c => `
      if (filename === '${c.filename}') return \`${c.content}\`;
    `).join('')}
    return '';
  }`;
  const loopCode = `
    (() => {
      let lastTime = 0;
      const loop = time => {
        if (mainLoop) mainLoop(time);
        if (time !== 0) updateFPS(1000 / (time - lastTime));
        lastTime = time;
        requestAnimationFrame(loop);
      }
      try { loop(0); } catch (e) {
        console.log(e);
      }
    })();
  `;
  const userCode = work.codes.find(c => c.filename === entry)!.content;
  const communicationCode = `
    const updateFPS = fps => {
      parent.window.postMessage({
        action: 'updateFPS',
        data: {
          fps,
        },
      }, '${hostname}');
    };
    window.addEventListener('message', e => {
      if (e.data.action === 'lockMouse') {
        document.getElementById('canvas').requestPointerLock();
      }
    }, false);
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === document.getElementById('canvas')) {
        return;
      }
      parent.window.postMessage({
        action: 'mouseUnlock',
      }, '${hostname}');
    }, false);
    Object.keys(console).map(f => {
      const func = console[f];
      console[f] = function(...args) {
        parent.window.postMessage({
          action: 'console.' + f,
          data: args,
        }, '${hostname}');
      };
    });
  `;
  const shadowedGlobals = [
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
  const wrapped = `
    (function (requestAnimationFrame, updateFPS, ${shadowedGlobals.join(', ')}) {
      ${[userCode, loopCode].join('\n')}
    }).bind({})(window.requestAnimationFrame, updateFPS);
  `;
  return [
    listeners,
    glCode,
    requireCode,
    GLSLcode,
    communicationCode,
    wrapped,
  ].join('\n');
};

export const compiled: IMiddleware = async (ctx, next) => {
  const src = await getScript(ctx.params.workId, 'index.js');
  ctx.body = htmlTemplate.replace('{% script %}', src);
};

export const raw: IMiddleware = async (ctx, next) => {
  const work = await DB.Work.getWork(ctx.params.workId);
  if (!work) return;
  const zip = new JSZip();
  work.codes.forEach(c => {
    zip.file(c.filename, c.content);
  });
  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9,
    },
  });
  ctx.body = content;
};
