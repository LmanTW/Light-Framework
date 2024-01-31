# Create A Simple Application
Let's build a simple application with Light-Framework that contains two main components (`navbar` and `pageContent`).

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
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

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
* Create a file called `page1.html`
```html
<h1>This is page 1</h1>
<button id="button_load">Load page 2</button>

<script id="script_page1" type="module">
  import Light from 'https://framework.light.tw/Asset/Light.mjs'

  // Get the component, this funciton will search upward along parentElement to find component root and return the Light instance
  let component = Light.getComponent(document.getElementById('script_page1'))

  // Listen to button click event (Using .Event.Listen so that everytime the component gets removed or loaded, the listener will be removed)
  component.Event.listen(document.getElementById('button_load'), 'click', async () => {
    component.load(await (await fetch('./page2.html')).text())
  })
</script>
```
* Create a file called `page2.html`
```html
<h1>This is page 2</h1>
<button id="button_load">Load page 1</button>

<script id="script_page1" type="module">
  import Light from 'https://framework.light.tw/Asset/Light.mjs'

  // Pretty much the same as page 1

  let component = Light.getComponent(document.getElementById('script_page1'))

  component.Event.listen(document.getElementById('button_load'), 'click', async () => {
    component.load(await (await fetch('./page1.html')).text())
  })
</script>
```

## Check Your Application
Congrats! You just made a [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application) with Light-Framework, enter `http://localhost:8080` in your browser to check your application!
