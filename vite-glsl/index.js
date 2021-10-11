const fs = require('fs');
const template = fs.readFileSync(__dirname + '/shader.js', 'utf-8');

const fileRegex = /\.(vert|frag)$/

module.exports = function myPlugin() {
    return {
        name: 'glsl-file',

        transform(src, id) {
            const match = id.match(fileRegex);
            if (match) {
                const code = template
                    .replaceAll('#type', match[1] === 'vert' ? 'vertex' : 'fragment')
                    .replaceAll('#code', src);

                return {
                    code,
                    map: null // provide source map if available
                }
            }
        }
    }
}
