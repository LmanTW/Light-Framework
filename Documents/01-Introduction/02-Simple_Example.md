# Simple Example
Suppose you want to build a [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application), it may look something like this. This is a simple applaction which you have two clickable boxes which when the user click, the color will change.

## File Structure
* [Main.html](mainhtml)
* [Box.html](boxhtml)

## Main.html
The main "frame" of the application, used to load all the components.
```html
<!DOCTYPE html>

<html>
  <body style="display: flex; margin: 0px">
    <div id="box1" style="width: 50vw; height: 100vh; cursor: pointer"></div>
    <div id="box2" style="width: 50vw; height: 100vh; cursor: pointer"></div>
  </body>

  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    const box1 = document.getElementById('box1')
    const box2 = document.getElementById('box2')

    // Create components for both boxes and load it from Box.html
    new Light(box1).load(await (await fetch('./Box.html')).text())
    new Light(box2).load(await (await fetch('./Box.html')).text())
  </script>
</html>
```

## Box.html
The component file for the component "box"
```html
<div id="color" light:style="width: 100%; height: 100%"></div>

<script>
  // Get the element in the component
  const color = Component.getElementByID('color')

  // (This is a script in a component, Light-Framework will expose Light, Component to the script.)

  // Set the color
  Light.setStyle(color, 'background-color', `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`)

  // Listen to click event
  Component.ListenerManager.listen(color, 'click', async () => Component.load(await (await fetch('./Box.html')).text()))

  // Get random 
  function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
</script>
```

You can check this example [here](../../Example/Simple-Example)
