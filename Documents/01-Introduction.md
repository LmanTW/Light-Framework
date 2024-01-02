# Introduction
Light-Framework is a really simple framework for building [SPA (Single-Page Application)](https://en.wikipedia.org/wiki/Single-page_application). It provides APIs to both [Javascript](https://en.wikipedia.org/wiki/JavaScript) and [HTML](https://en.wikipedia.org/wiki/HTML), and also allow developers to easily build plugins to extend the framework.

## Example
```html
<html>
  <body light:style="display: flex; center: row column">
    <h1 light:style="font-size: [2ps]; transition-duration: 0.1s; cursor: pointer" light:style:hover="transform: scale(1.2)" light:trigger="https://framework.light.tw/">Hello Light-Framework</h1>
  </body>
 
  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    new Light(document.body)
  </script>
</html>
```
