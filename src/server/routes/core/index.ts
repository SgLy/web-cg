import { readFileSync } from 'fs';
import * as path from 'path';

let js = readFileSync(path.join(__dirname, 'test.js')).toString();

export function updateCode(code: string) {
  js = code;
}

export function madeTemplate() {
  let html = readFileSync(path.join(__dirname, 'template.html')).toString();
  html = html.replace('{% script %}', js);
  return html;
}

export const getCode = () => js;
