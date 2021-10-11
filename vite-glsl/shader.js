/**
 * @type {GLenum}
 */
import { Shader } from 'vite-glsl/runtime';
const code = `#code`;
export const shader = new Shader(code, '#type');

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log(newModule);
    newModule.shader.update(shader);
  });
}

export const load = shader.load;
