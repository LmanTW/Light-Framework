# Light
The public API of Light-Framework.

* [Light](#light)
  * [use()](#use)
  * [createElement()](#createelement)
  * [createSvgElement()](#createsvgelement)
  * [setStyle()](#setstyle)
* [Light()](#light2)
  * [Getters](#getters)
  * [ListenerManager](#listenermanager)
  * [TimerManager](#timermanager)
  * [getElementByID()](#getelementbyid)
  * [getElementsByClassName()](#getelementsbyclassname)
  * [getElementsByTagName()](#getelementsbytagname)
  * [getAllElements()](#getallelements)
  * [load()](#load)
  * [remove()](#remove)

# Light
[[Installation](/document?page=Get%20Started%2FInstallation)]

## use()
```ts
.use(<Plugin>) // Use a plugin
```
* `Plugin <Plugin>` | The plugin that you want to use.

> return `<undefined>`

## createElement()
```ts
.createElement(<tagName>, <attributes>, <children>) // Create an element
```
* `tagName <string>` | The tag name of the element.
* `attributes <undefined | object>` | The attributes of the element.
* `children <undefined | HTMLElement[]>` | The children of the element.

> return `<HTMLElement>`

## createSvgElement()
```ts
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

# Light()
```ts
new Light(<element>, <data>) // Create a component
```
* `element <HTMLElement>` | The element where you want to mount the component.
* `data <any>` | Extra data that you want the component to hold.

## Getters
* `id <string>` | The ID of the component.
* `data <any>` | Extra data held by the component.
* `element <HTMLElement>` | The element that the component is mounted onto.

## getElementByID()
```ts
.getElementByID(<id>) // Get the element by ID in the component
```
* `id <string>` | The ID of the element.

> return `<undefined | HTMLElement>`

## getElementsByClassName()
```ts
.getElementsByClassName(<className>) // The elements by class name in the component
```
* `className <string>` | The class name of the element.

> return `<HTMLElement[]>`

## getElementsByTagName()
```ts
.getElementsByTagName(<tagName>) // The elements by tag name in the component
```
* `tagName <string>` | The tag name of the element.

> return `<HTMLElement[]>`

## getAllElements()
```ts
.getAllElements() // Get all elements in the component
```

> return `<HTMLElement[]>`

## load()
```ts
.load(<html>, <componentPath>) // Load the component
```
* `html <string>` | The HTML you want to load.
* `componentPath <undefined | html>` | The path of the component, this is required for relative path importing.

> return `<undefined>`

## remove()
```ts
.remove() // Remove the component
```
Removing a component won't remove the element that it's mounted on.

> return `<undefined>`
