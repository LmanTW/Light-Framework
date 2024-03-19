# Create The "Frame"
When building an [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application) with Light-Framework, you need a main html for loading all the basic layout components.

## Example
This is an example which includes navbar and page in the frame file.
```html
<!DOCTYPE html>

<html>
  <body>
    <div id="navbar" light:style="width: 100vw; height: [3ps]"></div>
    <div id="page" light:style="width: 100vw; height: calc(100vh - [3ps])"></div>
  </body>

  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    // Create a global component so we can use special css value under the body
    // Like [<number>ps] (stand for page size)
    const Component = new Light(document.body)

    // Create components for navbar and page, and load them from html 
    new Light(Component.getElementByID('navbar')).load(<html>)
    new Light(Component.getElementByID('page')).load(<html>)
  </script>
</html>
```
