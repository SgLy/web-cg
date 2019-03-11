import { readFileSync } from 'fs';
import * as path from 'path';

export default function madeTemplate() {
  let html = readFileSync(path.join(__dirname, 'template.html')).toString();
  const js = readFileSync(path.join(__dirname, 'test.js')).toString();
  html = html.replace('{% script %}', js);
  return html;
}
