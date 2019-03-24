import DB from '../database';
import { IMiddleware } from 'koa-router';
import { readFileSync } from 'fs';
import * as path from 'path';

const htmlTemplate = readFileSync(path.join(__dirname, 'template.html')).toString();

export const compiled: IMiddleware = async (ctx, next) => {
  const work = await DB.Work.getWork(ctx.params.workId);
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
    if (!mainLoop) mainLoop = () => {};

    (() => {
      const loop = () => {
        mainLoop();
        window.requestAnimationFrame(loop);
      }
      loop();
    })();
  `;
  const src = [
    glCode,
    GLSLcode,
    work.codes.find(c => c.filename === 'index.js')!.content,
    loopCode,
  ].join('\n');
  ctx.body = htmlTemplate.replace('{% script %}', src);
};
