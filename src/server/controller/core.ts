import DB from '../database';
import { IMiddleware } from 'koa-router';
import { readFileSync } from 'fs';
import * as path from 'path';

const htmlTemplate = readFileSync(path.join(__dirname, 'template.html')).toString();

const getScript = async (workId: number) => {
  const work = await DB.Work.getWork(workId);
  if (work === undefined) return '';
  const GLSLs = work.codes.filter(c => c.type === 'glsl');
  const glCode = `
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl2');
  `;
  const GLSLcode = `const requireGLSL = (filename) => {
    ${
      GLSLs.map(c => `if (filename === '${c.filename}') return \`${c.content}\`;`)
        .join('')
    }
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
    GLSLcode,
    work.codes.find(c => c.filename === 'index.js')!.content,
    loopCode,
  ].join('\n');
};

export const compiled: IMiddleware = async (ctx, next) => {
  const src = await getScript(ctx.params.workId);
  ctx.body = htmlTemplate.replace('{% script %}', src);
};
