import http from 'http'
import path from 'path'
import url from 'url'
import fs from 'fs'

const server = http.createServer((req, res) => {
  let reqPath = url.parse(req.url!).pathname!.split('/')

  reqPath.splice(0, 1) 

  const filePath = path.resolve(__dirname, '../../', reqPath.join('/'))

  if (fs.existsSync(filePath)) {
    const extension = path.extname(filePath)

    let data = fs.readFileSync(filePath, 'utf8')

    if (extension === '.html') res.setHeader('Content-Type', 'text/html')
    else if (extension === '.mjs') res.setHeader('Content-Type', 'application/javascript')

    res.end(data)
  } else res.end('Resource Not Found')
})

server.listen(8025)
