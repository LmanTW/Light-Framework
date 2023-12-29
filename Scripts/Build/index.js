const tsup = require('tsup')
const path = require('path')

tsup.build({
  entry: [path.resolve(__dirname, '../../Light/API.js')],

  //target: 'es6',
  format: 'esm',
  minify: true,

  outDir: path.resolve(__dirname, '../../Assets/'),
})
