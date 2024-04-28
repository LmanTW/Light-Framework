# Light
The public API of Light-Framework.

* [Light](#light)
  * [use()](#use)
  * [createElement()](#createelement)
  * [createSvgElement()](#createsvgelement)
  * [setStyle()](#setstyle)
  * [getComponent()](#getcomponent)
* [Light()](#light-1) 

# Light
[[Installation](/document?page=Get%20Started%2FInstallation)]

## use()
```js
.use(<Plugin>) // Use a plugin
```
* `Plugin <Plugin>` | The plugin that you want to use.

> return `<undefined>`

## createElement()
```js
.createElement(<tagName>, <attributes>, <children>) // Create an element
```
* `tagName <string>` | The tag name of the element.
* `attributes <undefined | object>` | The attributes of the element.
* `children <undefined | HTMLElement[]>` | The children of the element.

> return `<HTMLElement>`

## createSvgElement()
```js
.createSvgElement(<src>, <attributes>, <wait>) // Create a svg element
```
* `src <string>` | The source of the svg element.
* `attributes <undefined | object>` | The attributes of the element.
* `wait <undefined | boolean>` | Whether to wait for the svg element to load. `Default: false`

> return `return <HTMLElement> | Promise<HTMLElement>`
* `wait === true` | `return Promise<HTMLElement>`
* `wait === false` | `return <HTMLElement>`

## setStyle
```js
.setStyle(<element>, <name>, <value>) // Set the special style of the element
```
* `element <HTMLElement>` | The element that you want to set the special style.
* `name <string>` | The name of the property.
* `value <number | string>` | The value of the property.

This will change the `light:style` attribute.

> return `<undefined>`
