# Simple Example
Suppose you want to build a [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application), it may look something like this.

## File Structure
* [Main.html](mainhtml)
* [Box.html](boxhtml)

## Main.html
```html
<!DOCTYPE html>

<html>
  <body light:style="display: flex; margin: 0px">
    <div id="box1" light:style="width: 50vw; height: 100vh; cursor: pointer"></div>
    <div id="box2" light:style="width: 50vw; height: 100vh; cursor: pointer"></div>
  </body>

  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    // Create a global component, so we can use special css value under the body
    const globalComponent = new Light(document.body)

    // Get elements in the component
    const box1 = globalComponent.getElementByID('box1')
    const box2 = globalComponent.getElementByID('box2')

    // Create components for both boxes and load it from Box.html
    new Light(box1).load(await (await fetch('./Box.html')).text())
    new Light(box2).load(await (await fetch('./Box.html')).text())
  </script>
</html>
```

## Box.html
```html
<div id="color" light:style="width: 100%; height: 100%"></div>

<script>
  // Get the element in the component
  const color = Component.getElementByID('color') 

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

You can check this example at [here](../../Example/Simple-Example)
