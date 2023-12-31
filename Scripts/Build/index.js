const tsup = require('tsup')
const path = require('path')

tsup.build({
  entry: [path.resolve(__dirname, '../../Light-Framework/API.js')],

  keepNames: true,

  format: 'esm',
  minify: true,

  outDir: path.resolve(__dirname, '../../Assets/'),
})
