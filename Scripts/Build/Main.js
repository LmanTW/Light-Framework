const tsup = require('tsup')
const path = require('path')
const fs = require('fs')

fs.readdirSync(path.resolve(__dirname, '../../Assets')).forEach((file) => fs.unlinkSync(path.resolve(__dirname, `../../Assets/${file}`)))

// Build
async function build (entry, outputFileName, options) {
  await tsup.build(Object.assign({
    name: 'Light-Framework',
    entry: [entry],

    format: 'esm',
    minify: 'terser',

    outDir: path.resolve(__dirname, '../../Assets/'),
  }, (options === undefined) ? {} : options))

  if (options !== undefined && options.format === 'iife') fs.renameSync(path.resolve(__dirname, '../../Assets/API.global.js'), path.resolve(__dirname, `../../Assets/${outputFileName}.global.mjs`))
  else fs.renameSync(path.resolve(__dirname, '../../Assets/API.mjs'), path.resolve(__dirname, `../../Assets/${outputFileName}.mjs`))
}

// Start
async function start () {
  const info = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../Light-Framework/Info.json')))

  const date = new Date()
  const dateString = `${date.getFullYear()}/${new String(date.getMonth()+1).padStart(2, '0')}/${new String(date.getDate()).padStart(2, '0')} ${new String(date.getHours()).padStart(2, '0')}:${new String(date.getMinutes()).padStart(2, '0')}`

  info.build = dateString

  fs.writeFileSync(path.resolve(__dirname, '../../Light-Framework/Info.json'), JSON.stringify(info, null, 2))

  await build(path.resolve(__dirname, '../../Light-Framework/API.js'), 'Light')
  await build(path.resolve(__dirname, '../../Light-Framework/API.js'), 'Light', { format: 'iife', globalName: 'Light' })
}

start()
