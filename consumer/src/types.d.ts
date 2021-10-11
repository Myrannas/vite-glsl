declare module '*.vert' {
  export function load(gl: WebGL2RenderingContext, onReplace: () => void): WebGLShader;
}

declare module '*.frag' {
  export function load(gl: WebGL2RenderingContext, onReplace: () => void): WebGLShader;
}
