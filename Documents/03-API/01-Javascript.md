# Javascript API
* [Light](#light)
  * [use()](#use)
  * [createElement()](#createelement)
  * [createSvgElement()](#createsvgelement)
* [Light()](#light2)
  * [Event](#event)
    * [listen()](#listen)
  * [Timer](#timer)
  * [load()](#load)
  * [remove()](#remove)

# Light
```js
import Light from '<url>'
```
* [Installation](/document?page=02-Get-Started%2F01-Installation.md)

## use()
```js
Light.use(plugin) // Use plugin
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

You can also use certain [Special HTML Attributes](/document?page=02-Get-Started%2F03-Special-HTML-Attribute.md) in options, like:
* `style` as `light:style` | A object of styles, the name matches the styles in the DOM (like: `backgroundColor` instead of `background-color`)
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

# Light()
```js
new Light(<target>) // Create a component
```
* `target <string || HTMLElement>` | The root of the component

## load()
