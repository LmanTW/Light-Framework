# JavaScript API
* [Light](#light)
  * [use()](#use)
  * [createElement()](#createelement)
  * [createSvgElement()](#createsvgelement)
* [Light()](#light2)
  * [Event](#event)
    * [listen()](#listen)
    * [remove()](#remove)
  * [Timer](#timer)
    * [createInterval()](#createinterval)
    * [createLoop()](#createloop)
    * [deleteTimer()](#deletetimer)
  * [load()](#load)
  * [remove()](#remove)

# Light
```js
import Light from '<url>' // Import Light-Framework
```
* [Installation](/document?page=02-Get-Started%2F01-Installation.md)

## use()
```js
Light.use(plugin) // Use a plugin
```
* `plugin <object>` | A plugin

> return `<undefined>`

## createElement()
```js
Light.createElement(tagName, options, children) // Create Element
```
* `tagName <string>` | [HTML](https://en.wikipedia.org/wiki/HTML) element tag name
* `options <undefined || object>` | Attribute to the element
* `children <undefined || array>` | Children of the element (An array of [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement))

> return `<HTMLElement>`

You can also use certain [Special HTML Attributes](/document?page=03-API%2F02-HTML.md) in options, like:
* `style` as `light:style` | A object of styles, the property name can either be like `backgroundColor` or `background-color`
* `hover` as `light:style:hover` | A object of styles, like `style`
* `trigger` as `light:trigger` | Same as the [Special HTML Attribute](/document?page=02-Get-Started%2F03-Special-HTML-Attribute.md&header=lighttrigger) of `light:trigger`

### Example
```js
// Add a element with green background to document.body, which also have a child
document.body.appendChild(Light.createElement('div', { style: { backgroundColor: 'green', width: '[10ps]', height: '[10ps] }}, [
  Light.createElement('div')
]))
```

## createSvgElement()
```js
Light.createSvgElement(src, options) // Create Svg Element
```
* `src <string>` | The source of the svg image (a link or path)
* `options <undefined || object>` | Attribute to the element

> return `<HTMLElement>`

# Light()
```js
new Light(<target>) // Create a component
```
* `target <string || HTMLElement>` | The root of the component

## load()
```js
.load(html) // Load the component from html code
```
* `html <string>` | [HTML](https://zh.wikipedia.org/zh-tw/HTML) code

> return `<undefined>`

### Example
* index.html
```html
<html>
  <body></body>

  <script type="module">
    import Light from 'https://framework.light.tw/Asset/Light.mjs'

    let component = new Light(document.body)

    component.load(await (fetch('./component.html')).text())
  </script>
</html>
```
* component.html
```html
<div>
  <button id="button">Click Me</button>
</div>

<script id="script_component" type="module">
  // All the script tags should be in the outermost layer

  import Light from 'https://framework.light.tw/Asset/Light.mjs'

  let component = Light.getComponent(document.getElementById('script_component'))

  component.Event.listen(document.getElementById('button'), 'click', () => console.log('You just clicked the button'))
</script>
```

## remove()
```js
.remove() // Remove the component
```
This will also remove the root element of the component

> return `<undefined>`

# Event
```js
new Light(<target>).Event // The event manager for this component
```
We recommend you to use this when you're trying to listen to an event, because this module removes all the listeners when the component is removed or reloaded. This ensures that you won't have unnecessary listeners.

## listen()
```js
.listen(<target>, <name>, <callback>) // Listen to event
```
* `target <HTMLElement>` | The target that you want to listen on
* `name <string>` | The name of the event
* `callback <function>` | A function that is triggered when the event is called

> return `id <string>`

## remove()
```js
.remove(<id>) // Remove listener
```
* `id <undefined || string>` | The ID of the listener (if the ID is <undefined>, then it will simply remove all the listeners under this component).

> return `<undefined>`

# Timer
```js
new Light(<target>).Timer // The tiemr for this component
```
We recommend you to use this when you're trying to create interval or timeout, because this module removes all the timers when the component is removed or reloaded. This ensures that you won't have timers that are not suppose to trigger after the component is removed or reloaded.

## createInterval()
```js
.createInterval(<interval>, <callback>) // Create Interval
```
* `interval <number>` | Time between each interval (ms)
* `callback <function>` | A function that you want to execute

> return `id <string>`

## createLoop()
```js
.createLoop(<interval>, <times>, <callback>, <callback2>) // Create a loop with interval
```
* `interval <number>` | Time between each execution (ms)
* `times <number>` | The times you want to loop
* `callback <function>` | A function that you want to execute
* `callback2 <undefined || function>` | A function that you want to execute when the loop is finished

> return `id <string>`

## deleteTimer()
```js
.deleteTimer(<id>) // Delete timer
```
* `id <string>` | The id of the timer that you want to delete

> return `undefined`
