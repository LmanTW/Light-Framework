# Create An Application
Let's build an application with Light-Framework that contains two main components.

## Create A HTTP Server
If you don't know how to create a http server, here's an example using [node.js](https://nodejs.org/en) and [express](https://expressjs.com/).

* Create a file called `index.js`
```js
const express = require('express')

let server = express()
server.use(express.static(__dirname))

server.listen(8080)
```

## Create The "Frame"
