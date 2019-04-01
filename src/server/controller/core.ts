import DB from '../database';
import { IMiddleware } from 'koa-router';
import { readFileSync } from 'fs';
import * as path from 'path';

const htmlTemplate = readFileSync(path.join(__dirname, 'template.html')).toString();

const getScript = async (workId: number, entry: string) => {
  const work = await DB.Work.getWork(workId);
  if (work === undefined) return '';
  const JSs = work.codes.filter(
    c => c.type === 'javascript' && c.filename !== entry,
  );
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
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl2');
  `;
  const GLSLcode = `const requireGLSL = (filename) => {${
    GLSLs.map(c => `
      if (filename === '${c.filename}') return \`${c.content}\`;
    `).join('')}
    return '';
  }`;
  const loopCode = `
    (() => {
      const loop = () => {
        if (mainLoop) mainLoop();
        window.requestAnimationFrame(loop);
      }
      try { loop(); } catch (e) {
        console.error('错误：未定义绘图循环函数 mainLoop');
      }
    })();
  `;
  return [
    glCode,
    requireCode,
    GLSLcode,
    work.codes.find(c => c.filename === entry)!.content,
    loopCode,
  ].join('\n');
};

export const compiled: IMiddleware = async (ctx, next) => {
  const src = await getScript(ctx.params.workId, 'index.js');
  ctx.body = htmlTemplate.replace('{% script %}', src);
};
