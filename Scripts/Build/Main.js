(async () => {
  const { build } = require('tsup')
  const path = require('path')
  const fs = require('fs')

  const TextColor = {
    reset: '\x1b[0m',
    
    green: '\x1b[32m',
    purple: '\x1b[35m'
  }

  console.log(` 📌 ${TextColor.reset}Upading Info`)

  const date = new Date()
  const dateString = `${date.getFullYear()}/${new String(date.getMonth()+1).padStart(2, '0')}/${new String(date.getDate()).padStart(2, '0')} ${new String(date.getHours()).padStart(2, '0')}:${new String(date.getMinutes()).padStart(2, '0')}`

  const info = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Light-Framework/Info.json')))

  fs.writeFileSync(path.join(__dirname, '../../Light-Framework/Info.json'), `{\n  "version": "${info.version}",\n  "build": "${dateString}",\n\n  "github": "${info.github}"\n}`)

  console.log(` 📌 ${TextColor.green}Successfully Upated Info (Build: ${dateString})`)

  console.log(`\n 📦 ${TextColor.reset}Bundling Light-Framework To ESM`)

  await build({
    entry: [path.resolve(__dirname, '../../Light-Framework/API.js')],

    target: 'es6',
    minify: 'terser',

    outDir: path.join(__dirname, 'Cache'),
    format: 'esm',

    silent: true
  })

  console.log(` 📦 ${TextColor.green}Successfully Bundled Light-Framework To ESM (Size: ${parseFloat(fs.statSync(path.join(__dirname, 'Cache', 'API.mjs')).size / 1024).toFixed(2)} KB)`)

  fs.renameSync(path.join(__dirname, 'Cache', 'API.mjs'), path.resolve(__dirname, '../../Assets/Light.mjs'))

  console.log(`\n 📦 ${TextColor.reset}Bundling Light-Framework To IIFE`)

  await build({
    entry: [path.resolve(__dirname, '../../Light-Framework/API.js')],

    target: 'es6',
    minify: 'terser',

    outDir: path.join(__dirname, 'Cache'),
    format: 'iife',

    silent: true
  })

  fs.writeFileSync(path.resolve(__dirname, '../../Assets/Light.global.mjs'), `var Light=` + fs.readFileSync(path.join(__dirname, 'Cache', 'API.global.js'), 'utf8'))

  console.log(` 📦 ${TextColor.green}Successfully Bundled Light-Framework To IIFE (Size: ${parseFloat(fs.statSync(path.resolve(__dirname, '../../Assets/Light.global.mjs')).size / 1024).toFixed(2)} KB)\n`)

  fs.readdirSync(path.join(__dirname, 'Cache')).forEach((file) => fs.rmSync(path.join(__dirname, 'Cache', file)))
})()
