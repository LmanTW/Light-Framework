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
Everytime the user first loads this application, we need a 'frame' to load all the components.

* Create a file called `index.html`
```html
<html>
  <body style="margin: 0px">
    <div id="navbar" light:style="display: flex; center: column; background-color: green; width: 100vw; height: [3ps]"></div>
    <div id="pageContent" light:style="display: flex; flex-direction: column; center: row column; width: 100vw; height: calc(100vh - [3ps])"></div>
  </body>
 
  <script type="module">
    import Light from '../../Light-Framework/API.js'

    // Create a component and mount it onto document.body, so we can use special html attribute (light:) and custom css unit ([ps], stand for page size)
    new Light(document.body)
    //        ^ Can also be a css query selector <string>

    // Create a component for navbar and mount it onto #navbar
    new Light('#navbar')
      // Load the navbar component from ./navbar
      .load(await (await fetch('./navbar.html')).text())

    // Create a component for pageContent and mount it onto #pageContent
    new Light('#pageContent')
      // Load the pageContent component from ./page1.html
      .load(await (await fetch('./page1.html')).text())

      document.querySelector('#pageContent')
  </script>
</html>
```

## Create Pages
