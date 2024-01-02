# Example
An example to build a simple [SPA (Single-Page Application)](https://en.wikipedia.org/wiki/Single-page_application), which refreshs a component every time user click the "Reload" button.

## File Tree
| `index.html`<br>
| `page.html`

## index.html
```html
<html>
  <body style="margin: 0px"></body>
 
  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    // Create a component
    new Light(document.body.appendChild(Light.createElement('div')))
      // Load component from html text
      .load(await (await fetch('./page.html')).text())
  </script>
</html>
```

## page.html
```html
<div id="background" light:style="display: flex; center: row column; width: 100vw; height: 100vh">
  <h1 id="button_reload" light:style="font-size: [2ps]; cursor: pointer">Reload</h1>
</div>

<script type="module">
  import Light from 'https://framework.light.tw/Asset/Light.mjs'

  // Get this component (The component that just created)
  let component = Light.getComponent()

  const background = document.getElementById('background')
  const button_reload = document.getElementById('button_reload')

  // Randomise background color
  background.style.backgroundColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`

  component.Event.listen(button_reload, 'click', async () => {
    // Remove this component
    component.remove()

    // Create a component
    new Light(document.body.appendChild(Light.createElement('div')))
       // Load component from html text
      .load(await (await fetch('./page.html')).text())
  })
</script>
```
