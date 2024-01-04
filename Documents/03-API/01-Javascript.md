# Javascript API
* [Light](#Light)
  * [use()](#use)
  * [createElement()](#createelement)
  * [createSvgElement()](#createsvgelement)
* [Light()](#light2)

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
* `children <undefined || array>` | Children of the element (An array of `HTMLElement`)

> return `<HTMLElement>`

You can also use some [Special HTML Attributes](/document?page=02-Get-Started%2F03-Special-HTML-Attribute.md) in options, like:
* `style` as `light:style` | A object of styles, the name is same as the dom (like: `backgroundColor` instead of `background-color`)
* `hover` as `light:style:hover`
* `trigger` as `light:trigger`

### Example
```js
// Add a element with green background to document.body, which also have a child
document.body.appendChild(Light.createElement('div', { style: { backgroundColor: 'green', width: '[10ps]', height: '[10ps] }}, [
  Light.createElement('div')
]))
```

# Light()
