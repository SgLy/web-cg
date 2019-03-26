import * as monaco from 'monaco-editor';
import WebGL2Typings from './WebGL2Typing';

interface ILanguage extends monaco.languages.IMonarchLanguage {
  operators?: string[];
  keywords?: string[];
  invalids?: string[];
  types?: string[];
  constants?: string[];
  predefinedVariable: string[];
  symbols?: RegExp;
  escapes?: RegExp;
  integersuffix?: RegExp;
  floatsuffix?: RegExp;
  encoding?: RegExp;
}

function registerGLSL() {
  // tslint:disable:max-line-length

  const id = 'glsl';

  // https://github.com/Microsoft/monaco-languages/blob/master/src/cpp/cpp.ts
  const conf: monaco.languages.LanguageConfiguration = {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '[', close: ']' },
      { open: '{', close: '}' },
      { open: '(', close: ')' },
      { open: '\'', close: '\'', notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '\'', close: '\'' },
    ],
  };

  const language: ILanguage = {
    defaultToken: '',
    tokenPostfix: '.glsl',

    brackets: [
      { open: '{', close: '}', token: 'delimiter.curly' },
      { open: '[', close: ']', token: 'delimiter.square' },
      { open: '(', close: ')', token: 'delimiter.parenthesis' },
      { open: '<', close: '>', token: 'delimiter.angle' },
    ],

    operators: [
      '=', '>', '<', '!', '~', '?', ':',
      '==', '<=', '>=', '!=', '&&', '||', '++', '--',
      '+', '-', '*', '/', '&', '|', '^', '%', '<<',
      '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
      '^=', '%=', '<<=', '>>=',
    ],

    constants: ['__LINE__', '__FILE__', '__VERSION__', 'GL_core_profile', 'GL_es_profile', 'GL_compatibility_profile', 'gl_MaxClipPlanes', 'gl_MaxCombinedTextureImageUnits', 'gl_MaxDrawBuffers', 'gl_MaxFragmentUniformComponents', 'gl_MaxLights', 'gl_MaxTextureCoords', 'gl_MaxTextureImageUnits', 'gl_MaxTextureUnits', 'gl_MaxVaryingFloats', 'gl_MaxVertexAttribs', 'gl_MaxVertexTextureImageUnits', 'gl_MaxVertexUniformComponents', 'abs', 'acos', 'all', 'any', 'asin', 'atan', 'ceil', 'clamp', 'cos', 'cross', 'degrees', 'dFdx', 'dFdy', 'distance', 'dot', 'equal', 'exp', 'exp2', 'faceforward', 'floor', 'fract', 'ftransform', 'fwidth', 'greaterThan', 'greaterThanEqual', 'inversesqrt', 'length', 'lessThan', 'lessThanEqual', 'log', 'log2', 'matrixCompMult', 'max', 'min', 'mix', 'mod', 'noise1', 'noise2', 'noise3', 'noise4', 'normalize', 'not', 'notEqual', 'outerProduct', 'pow', 'radians', 'reflect', 'refract', 'shadow1D', 'shadow1DLod', 'shadow1DProj', 'shadow1DProjLod', 'shadow2D', 'shadow2DLod', 'shadow2DProj', 'shadow2DProjLod', 'sign', 'sin', 'smoothstep', 'sqrt', 'step', 'tan', 'texture1D', 'texture1DLod', 'texture1DProj', 'texture1DProjLod', 'texture2D', 'texture2DLod', 'texture2DProj', 'texture2DProjLod', 'texture3D', 'texture3DLod', 'texture3DProj', 'texture3DProjLod', 'textureCube', 'textureCubeLod', 'transpose'],

    predefinedVariable: ['gl_BackColor', 'gl_BackLightModelProduct', 'gl_BackLightProduct', 'gl_BackMaterial', 'gl_BackSecondaryColor', 'gl_ClipDistance', 'gl_ClipPlane', 'gl_ClipVertex', 'gl_Color', 'gl_DepthRange', 'gl_DepthRangeParameters', 'gl_EyePlaneQ', 'gl_EyePlaneR', 'gl_EyePlaneS', 'gl_EyePlaneT', 'gl_Fog', 'gl_FogCoord', 'gl_FogFragCoord', 'gl_FogParameters', 'gl_FragColor', 'gl_FragCoord', 'gl_FragData', 'gl_FragDepth', 'gl_FrontColor', 'gl_FrontFacing', 'gl_FrontLightModelProduct', 'gl_FrontLightProduct', 'gl_FrontMaterial', 'gl_FrontSecondaryColor', 'gl_InstanceID', 'gl_Layer', 'gl_LightModel', 'gl_LightModelParameters', 'gl_LightModelProducts', 'gl_LightProducts', 'gl_LightSource', 'gl_LightSourceParameters', 'gl_MaterialParameters', 'gl_ModelViewMatrix', 'gl_ModelViewMatrixInverse', 'gl_ModelViewMatrixInverseTranspose', 'gl_ModelViewMatrixTranspose', 'gl_ModelViewProjectionMatrix', 'gl_ModelViewProjectionMatrixInverse', 'gl_ModelViewProjectionMatrixInverseTranspose', 'gl_ModelViewProjectionMatrixTranspose', 'gl_MultiTexCoord0', 'gl_MultiTexCoord1', 'gl_MultiTexCoord2', 'gl_MultiTexCoord3', 'gl_MultiTexCoord4', 'gl_MultiTexCoord5', 'gl_MultiTexCoord6', 'gl_MultiTexCoord7', 'gl_Normal', 'gl_NormalMatrix', 'gl_NormalScale', 'gl_ObjectPlaneQ', 'gl_ObjectPlaneR', 'gl_ObjectPlaneS', 'gl_ObjectPlaneT', 'gl_Point', 'gl_PointCoord', 'gl_PointParameters', 'gl_PointSize', 'gl_Position', 'gl_PrimitiveIDIn', 'gl_ProjectionMatrix', 'gl_ProjectionMatrixInverse', 'gl_ProjectionMatrixInverseTranspose', 'gl_ProjectionMatrixTranspose', 'gl_SecondaryColor', 'gl_TexCoord', 'gl_TextureEnvColor', 'gl_TextureMatrix', 'gl_TextureMatrixInverse', 'gl_TextureMatrixInverseTranspose', 'gl_TextureMatrixTranspose', 'gl_Vertex', 'gl_VertexID'],

    keywords: ['precision', 'highp', 'mediump', 'lowp', 'break', 'case', 'continue', 'default', 'discard', 'do', 'else', 'for', 'if', 'return', 'switch', 'while', 'false', 'FALSE', 'NULL', 'true', 'TRUE', 'layout', 'attribute', 'centroid', 'sampler', 'patch', 'const', 'flat', 'in', 'inout', 'invariant', 'noperspective', 'out', 'smooth', 'uniform', 'varying', 'buffer', 'shared', 'coherent', 'readonly', 'writeonly'],

    invalids: ['asm', 'enum', 'extern', 'goto', 'inline', 'long', 'short', 'sizeof', 'static', 'typedef', 'union', 'unsigned'],

    types: ['void', 'bool', 'int', 'uint', 'float', 'double', 'vec2', 'vec3', 'vec4', 'dvec2', 'dvec3', 'dvec4', 'bvec2', 'bvec3', 'bvec4', 'ivec2', 'ivec3', 'ivec4', 'uvec2', 'uvec3', 'uvec4', 'mat2', 'mat3', 'mat4', 'mat2x2', 'mat2x3', 'mat2x4', 'mat3x2', 'mat3x3', 'mat3x4', 'mat4x2', 'mat4x3', 'mat4x4', 'dmat2', 'dmat3', 'dmat4', 'dmat2x2', 'dmat2x3', 'dmat2x4', 'dmat3x2', 'dmat3x3', 'dmat3x4', 'dmat4x2', 'dmat4x3', 'dmat4x4', 'sampler1D', 'sampler2D', 'sampler3D', 'image1D', 'image2D', 'image3D', 'samplerCube', 'imageCube', 'sampler2DRect', 'image2DRect', 'sampler1DArray', 'sampler2DArray', 'image1DArray', 'image2DArray', 'samplerBuffer', 'imageBuffer', 'sampler2DMS', 'image2DMS', 'sampler2DMSArray', 'image2DMSArray', 'samplerCubeArray', 'imageCubeArray', 'sampler1DShadow', 'sampler2DShadow', 'sampler2DRectShadow', 'sampler1DArrayShadow', 'sampler2DArrayShadow', 'samplerCubeShadow', 'samplerCubeArrayShadow', 'isampler1D', 'isampler2D', 'isampler3D', 'iimage1D', 'iimage2D', 'iimage3D', 'isamplerCube', 'iimageCube', 'isampler2DRect', 'iimage2DRect', 'isampler1DArray', 'isampler2DArray', 'iimage1DArray', 'iimage2DArray', 'isamplerBuffer', 'iimageBuffer', 'isampler2DMS', 'iimage2DMS', 'isampler2DMSArray', 'iimage2DMSArray', 'isamplerCubeArray', 'iimageCubeArray', 'atomic_uint', 'usampler1D', 'usampler2D', 'usampler3D', 'uimage1D', 'uimage2D', 'uimage3D', 'usamplerCube', 'uimageCube', 'usampler2DRect', 'uimage2DRect', 'usampler1DArray', 'usampler2DArray', 'uimage1DArray', 'uimage2DArray', 'usamplerBuffer', 'uimageBuffer', 'usampler2DMS', 'uimage2DMS', 'usampler2DMSArray', 'uimage2DMSArray', 'usamplerCubeArray', 'uimageCubeArray', 'struct'],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [/[a-zA-Z_]\w*/, {
          cases: {
            '@constants': { token: 'constant' },
            '@predefinedVariable': { token: 'variable.predefined' },
            '@keywords': { token: 'keyword.$0' },
            '@invalids': { token: 'invalid' },
            '@types': { token: 'type' },
            '@default': 'identifier',
          },
        }],

        // whitespace
        { include: '@whitespace' },

        // [[ attributes ]].
        [/\[\[.*\]\]/, 'annotation'],

        [/^\s*#version/, { token: 'keyword.directive.version', next: '@version' }],

        // Preprocessor directive
        [/^\s*#\s*\w+/, 'keyword'],

        // delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, {
          cases: {
            '@operators': 'delimiter',
            '@default': '',
          },
        }],

        // numbers
        [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
        [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
        [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
        [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
        [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
        [/\d[\d']*\d(@integersuffix)/, 'number'],
        [/\d(@integersuffix)/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/"/, 'string', '@string'],

        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
        [/'/, 'string.invalid'],
      ],

      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],

      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment'],
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop'],
      ],

      version: [
        [ /(\s*)(\d+)(\s*)(es)/, [
          { token: '' },
          { token: 'keyword.directive.version.begin' },
          { token: 'string.version.identifier' },
          { token: 'keyword.directive.version.end', next: '@pop' },
        ]],
      ],
    },
  };

  // Register a new language
  monaco.languages.register({
    id,
    extensions: ['.glsl'],
    aliases: ['GLSL'],
  });

  monaco.languages.onLanguage(id, () => {
    monaco.languages.setMonarchTokensProvider(id, language);
    monaco.languages.setLanguageConfiguration(id, conf);
  });
}

function jsExtraLib() {
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    WebGL2Typings, 'WebGL2.d.ts',
  );
  monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    declare const gl: WebGL2RenderingContext;
    declare const requireGLSL: (filename: string) => string;
  `, 'webcg.d.ts');
}

export default () => {
  jsExtraLib();
  registerGLSL();
};
