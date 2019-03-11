function compileShader(content, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, content);
  gl.compileShader(shader);

  // Check if success
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    const infoLog = gl.getShaderInfoLog(shader);
    const t = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment';
    console.error(`${t} shader compile error: ${infoLog}`);
  }

  return shader;
}

const canvas = document.getElementById('canvas');
/**
 * @type {WebGL2RenderingContext}
 */
const gl = canvas.getContext('webgl2');
const isWebGL2 = !!gl;
const fragment_glsl = `#version 300 es

precision mediump float;

out vec4 color;
in vec3 v_color;

void main()
{
    color = vec4(v_color, 1.0f);
}`;
const vertice_glsl = `#version 300 es

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 color;
out vec3 v_color;

void main()
{
    gl_Position = vec4(position.x, position.y, position.z, 1.0);
    v_color = color;
}`;

const vertices = new Float32Array([
  // Position       // Color
  -0.5, -0.5, 0.0,  1.0, 0.0, 0.0,
   0.5, -0.5, 0.0,  0.0, 1.0, 0.0,
   0.0,  0.5, 0.0,  0.0, 0.0, 1.0
]);
const VBO = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const fshader = compileShader(fragment_glsl, gl.FRAGMENT_SHADER);
const vshader = compileShader(vertice_glsl, gl.VERTEX_SHADER);

const shader_program = gl.createProgram();
gl.attachShader(shader_program, fshader);
gl.attachShader(shader_program, vshader);
gl.linkProgram(shader_program);

gl.useProgram(shader_program);
gl.deleteShader(fshader);
gl.deleteShader(vshader);

const VAO = gl.createVertexArray();
gl.bindVertexArray(VAO);
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * 4, 0);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 6 * 4, 3 * 4);
gl.enableVertexAttribArray(1);
gl.useProgram(shader_program);

gl.bindVertexArray(null);

function mainLoop() {
  window.requestAnimationFrame(() => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shader_program);
    gl.bindVertexArray(VAO);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);

    mainLoop();
  });
}

mainLoop();
