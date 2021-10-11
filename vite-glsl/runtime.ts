export class Shader {
  private shaders: ((code: string) => void)[] = [];

  constructor(private code: string, private type: 'fragment' | 'vertex') {
  }

  load = (gl: WebGL2RenderingContext, onReplace: Function) => {
    const type = this.type === 'fragment' ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;

    const shader = gl.createShader(type);
    gl.shaderSource(shader, this.code);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      // Something went wrong during compilation; get the error
      console.error("could not compile shader:" + gl.getShaderInfoLog(shader));
    }

    if (import.meta.hot) {
      this.shaders.push((newCode) => {
        gl.shaderSource(shader, newCode);
        gl.compileShader(shader);

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
          // Something went wrong during compilation; get the error
          console.error("could not compile shader:" + newCode+ gl.getShaderInfoLog(shader));
        } else {

          onReplace();
          console.log("Shader recompiled");
        }
      });
    }

    return shader;
  }

  update(shader: Shader) {
    this.shaders.push(...shader.shaders)

    for (const trigger of this.shaders) {
      trigger(this.code);
    }
  }
}
