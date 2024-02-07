const express = require('express')
const path = require('path')

const server = express()
server.use(express.static(path.resolve(__dirname, '../../')))

server.listen(8081)
