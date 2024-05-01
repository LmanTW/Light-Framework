# Component Script
You can run a script in a component by adding a script tag into the HTML that you'll load into the component:

* `component.ts`
```html
<h1>Hello World</h1>

<script>
  console.log('Hello World')
</script>
```

The script will be run in a [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), so it's not actually a "script" tag, there for some behavior may be different.

## Access To APIs
When running a component script, [Light](/document?page=API%2FLight&header=light2) and [Component](/document?page=API%2FLight&header=light3) APIs will be automatically imported.

## Module Importing
If you want to import another module in a component script, you need to set `type="module"` (This will also make the outer scope async.) and there will be a `Import` function that you can use:

* `module.js`
```js
function log (content) {
  console.log(content)
}

export { log }
```

* `component.html`
```html
<script type="module">
  const module = await Import('./component')
                               ^ relative path importing won't work if you didn't provide the `componentPath` when loading the component
</script>
```

If you want to import a default module, it will be a bit different:

* `module.js`
```js
export default (content) => {
  console.log(content)
}
```

* `component.html`
```html
<script type="module">
  const module = (await Import('./component')).default
                               ^ relative path importing won't work if you didn't provide the `componentPath` when loading the component
</script>
```

# Event Handling
You should use the [ListenerManager](/document?page=API%2FCore&header=listenermanager)to listen to an event, so the listener will be disposed after the component is reloaded or removed.

* `component.html`
```html
<h1 id="button">Click Me!</h1>

<script>
  const button = Component.getElementByID('button')
                 ^ Get the element in the component

  Component.ListenerManager.listen(button, 'click', () => console.log('The button is clicked!'))
                                   ^ listen the event on element "button"
</script>
```

## Timer Handling
You should use the [TimerManager](/document?page=API%2FCore&header=timermanager)to create a timer, so the timer will be disposed after the component is reloaded or removed.

* `component.html`
```html
<h1 id="text">Count: 0</h1>

<script>
  const text = Component.getElementByID('text')
                 ^ Get the element in the component

  Component.TimerManager.createInterval(100, (count) => text.innerHTML = `Count: ${count}`)
                         ^ Create an interval
</script>
```
