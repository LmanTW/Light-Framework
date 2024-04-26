import { build } from 'tsup'
import path from 'path'
import fs from 'fs'

// Build
export default async () => {
  if (!fs.existsSync(path.join(__dirname, 'Cache'))) fs.mkdirSync(path.join(__dirname, 'Cache'))

  console.log(` 📌 ${TextColor.reset}Upading Info`)

  const info = JSON.parse(fs.readFileSync(path.join(__dirname, '../../Light-Framework/Info.json'), 'utf8'))

  const date = new Date()
  const dateString: string = `${date.getFullYear()}/${new String(date.getMonth()+1).padStart(2, '0')}/${new String(date.getDate()).padStart(2, '0')} ${new String(date.getHours()).padStart(2, '0')}:${new String(date.getMinutes()).padStart(2, '0')}`

  fs.writeFileSync(path.join(__dirname, '../../Light-Framework/Info.json'), `{\n  "version": "${info.version}",\n  "build": "${dateString}",\n\n  "github": "${info.github}"\n}`)

  console.log(` 📌 ${TextColor.green}Successfully Upated Info (Build: ${dateString})${TextColor.reset}\n`)

  console.log(` 📦 Bundling Light-Framework (ESM)`)

  await build({
    silent: true,

    entry: [path.resolve(__dirname, '../../Light-Framework/API.ts')],

    target: 'es6',
    minify: 'terser',

    outDir: path.join(__dirname, 'Cache'),
    format: 'esm'
  })

  fs.renameSync(path.join(__dirname, 'Cache', 'API.mjs'), path.resolve(__dirname, '../../Assets/Light.mjs'))

  console.log(` 📦 Bundling Light-Framework (IIFE)`)

  await build({
    silent: true,

    globalName: 'Light',
    entry: [path.resolve(__dirname, '../../Light-Framework/API.ts')],

    target: 'es6',
    minify: 'terser',

    outDir: path.join(__dirname, 'Cache'),
    format: 'iife'
  })

  const content = fs.readFileSync(path.join(__dirname, 'Cache', 'API.global.js'), 'utf8')

  fs.writeFileSync(path.resolve(__dirname, '../../Assets/Light.global.mjs'), `${content.substring(0, content.length - 1)}.Light;`)

  console.log(` ${TextColor.green}📦 Successfully Bundled Light-Framework${TextColor.reset}\n`) 

  for (let fileName of fs.readdirSync(path.resolve(__dirname, '../../Plugins'))) {
    if (fs.statSync(path.resolve(__dirname, `../../Plugins/${fileName}`)).isDirectory()) {
      console.log(` 🔌 Bundling Plugins: ${fileName}`)

      await build({
        silent: true,

        entry: [path.resolve(__dirname, `../../Plugins/${fileName}/Main.ts`)],

        target: 'es6',
        minify: 'terser',

        outDir: path.resolve(__dirname, `../../Plugins/${fileName}`),
        format: 'esm'
      })
    }
  }

  console.log(` ${TextColor.green}🔌 Successfully Bundled All Plugins${TextColor.reset}\n`)

  fs.rmSync(path.join(__dirname, 'Cache'), { recursive: true })
}

const TextColor: { [key: string]: string } = {
  reset: '\x1b[0m',
    
  green: '\x1b[32m',
  purple: '\x1b[35m'
}
