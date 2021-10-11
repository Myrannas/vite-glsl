#version 300 es
in vec2 coords;

void main() {
    gl_Position = vec4(coords, 0.1, 1.0);
}
