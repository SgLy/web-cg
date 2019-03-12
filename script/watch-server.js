/* eslint-disable no-console */

const ts = require('typescript');
const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'development';

/**
 * https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#writing-an-incremental-program-watcher
 */

const formatHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

function watchMain() {
  const configPath = ts.findConfigFile(
    path.join(__dirname, '..', 'src', 'server'),
    ts.sys.fileExists,
    'tsconfig.json'
  );
  if (!configPath) {
    throw new Error('Could not find a valid \'tsconfig.json\'.');
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  const origPostProgramCreate = host.afterProgramCreate;
  host.afterProgramCreate = program => {
    origPostProgramCreate(program);
    restartServer();
  };

  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic) {
  console.log(
    'Error',
    diagnostic.code,
    ':',
    ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      formatHost.getNewLine()
    )
  );
}

function reportWatchStatusChanged(diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

let startServer, stopServer;
function restartServer() {
  if (stopServer) stopServer();
  Object.keys(require.cache).forEach(f => {
    if (f.indexOf('node_modules') === -1) delete require.cache[f];
  });
  ({startServer, stopServer} = require('../build/server/index'));
  startServer();
}

watchMain();

function watchCore() {
  const src = path.join(__dirname, '..', 'src', 'server', 'routes', 'core');
  const dest = path.join(__dirname, '..', 'build', 'server', 'routes', 'core');
  const files = ['template.html', 'test.js'];
  fs.watch(src, {
    recursive: true
  }, () => {
    files.forEach(file => {
      fs.copyFileSync(path.join(src, file), path.join(dest, file));
    });
  });
}

watchCore();