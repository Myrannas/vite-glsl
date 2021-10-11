import {
  resizeCanvasToDisplaySize,
} from "twgl.js";
import { load as fragment } from './test-vertex.vert';
import { load as vertex } from './test-fragment.frag';

const element = document.getElementById("webgl") as HTMLCanvasElement;

const gl = element.getContext("webgl2")!;

const v = vertex(gl, () => {
  console.log("Relinking program")
  gl.linkProgram(program);
});
const f = fragment(gl, () => {
  gl.linkProgram(program);
});

const program = gl.createProgram()!;
gl.attachShader(program, v);
gl.attachShader(program, f);
gl.linkProgram(program);

console.log(gl.getProgramInfoLog(program));

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

const callback = () => {
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(program);

  gl.enableVertexAttribArray(0);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(
    0, 2, gl.FLOAT, false, 0, 0
  )

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(callback);
};
requestAnimationFrame(callback);

// const items = new Array(200_000).fill(0);
//
// const offsets = new Array(200_000).fill(0);
// let position = 0;
// for (let i = 0; i < 500; i++) {
//   let id_x = Math.floor(Math.random() * 128);
//   let id_y = Math.floor(Math.random() * 128);
//
//   for (let x = 0; x < 5; x++) {
//     for (let y = 0; y < 2; y++) {
//       items[position] = id_x;
//       offsets[position++] = x * 3;
//
//       items[position] = id_y;
//       offsets[position++] = y * 3;
//     }
//   }
// }
//
// console.log(offsets);
//
// const itemLength = items.length / 2;
//
// const vertexAttribArray = gl.createVertexArray();
//
// gl.enableVertexAttribArray(gl.getAttribLocation(program, "coords"));
// const coords = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, coords);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
// // gl.vertexA
//
// const arrays = createBufferInfoFromArrays(gl, {
//   coords: {
//     size: 2,
//     data: [-1, -1, -1, 1, 1, -1, 1, 1],
//   },
//
//   id: {
//     size: 2,
//     data: new Int8Array(items),
//     divisor: 1,
//   },
//
//   offset: {
//     size: 2,
//     data: offsets,
//     divisor: 1,
//   },
// });
//
// const positionData = new Float32Array(
//   new Array(128 * 128 * 2).fill(undefined).map(() => Math.random() * 1000 - 500)
// );
//
// const directions = new Float32Array(
//   new Array(128 * 128 * 2).fill(undefined).map(() => Math.random() * 2.0 - 1.0)
// );
//
// class DoubleBufferedTexture {
//   private textures!: [WebGLTexture, WebGLTexture];
//   private active: 0 | 1 = 0;
//
//   init(data: Float32Array) {
//     const textures: WebGLTexture[] = [];
//     for (let i = 0; i < 2; i++) {
//       const texture = gl.createTexture()!;
//       gl.bindTexture(gl.TEXTURE_2D, texture);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//       gl.texImage2D(
//         gl.TEXTURE_2D,
//         0,
//         gl.RG32F,
//         128,
//         128,
//         0,
//         gl.RG,
//         gl.FLOAT,
//         data
//       );
//       textures.push(texture);
//     }
//
//     this.textures = textures as [WebGLTexture, WebGLTexture];
//   }
//
//   upload(data: Float32Array) {
//     gl.bindTexture(gl.TEXTURE_2D, this.textures[1 - this.active]);
//     gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 128, 128, gl.RG, gl.FLOAT, data);
//   }
//
//   flip() {
//     this.active = this.active === 1 ? 0 : 1;
//   }
//
//   get texture(): WebGLTexture {
//     return this.textures[this.active];
//   }
// }
//
// gl.enable(gl.DEPTH_TEST);
//
// const tex = new DoubleBufferedTexture();
// tex.init(positionData);
//
// const screenLocation = gl.getUniformLocation(program, 'screen');
// const offsetLocation = gl.getUniformLocation(program, 'offsets');
// function render() {
//   tex.flip();
//
//   resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//
//   gl.useProgram(program);
//
//   // gl.bindB
//   setBuffersAndAttributes(gl, program, arrays);
//
//   gl.uniform2fv(screenLocation, [
//     gl.canvas.width, gl.canvas.height
//   ]);
//
//   gl.bindTexture(gl.TEXTURE0, tex.texture);
//   gl.uniform1i(offsetLocation, gl.TEXTURE0)
//
//
//
//   gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, itemLength);
//
//   for (let i = 0; i < positionData.length; i++) {
//     positionData[i] += directions[i];
//   }
//
//   tex.upload(positionData);
//
//   requestAnimationFrame(render);
// }
//
// requestAnimationFrame(render);
