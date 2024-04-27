# Component Basics
Creating a component in Light-Framework is the first step to start leaning Light-Framework, so let's create one:

```html
<!DOCTYPE html>

<html>
  <body>
    <div id="app"></div>
  </body>

  <script src="Path to Light.global.mjs"></script>

  <script>
    const component = new Light(document.getElementById('app'))
    //                ^ Create a component and mount it onto #app
  </script>
</html>
```

## Load A Component
You can load a component from a HTML code:

* `component.html`
```html
<h1>Hello World</h1>
```

Add this into your main script:
```js
async function loadComponent () {
  component.load(await (await fetch('./component.html')).text())
  //        ^ Load the component from the fetch result
}

loadComponent()
```

## Remove A Component
You can remove a component using the following code:

```js
component.remove()
```

> Removing a Light-Framework component won't remove the element that it's mounted on.
