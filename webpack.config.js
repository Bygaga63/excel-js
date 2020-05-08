const path = require('path');


module.exports = {
    context: path.resolve(__dirname, 'src'), // - настройка контекста, типо workdir в docker
    mode: "development",
    entry: './index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};