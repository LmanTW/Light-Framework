# Core
The private API of Light-Framework. Core is the hidden API under the [Component API](/document?page=API%2FLight&header=light3), it has control over the whole component.

* [Core()](#core)
  * [Getters](#getters)
  * [Setters](#setters)
  * [ListenerManager](#listenermanager)
    * [listen()](#listen)
    * [removeListener()](#removelistener)
    * [removeAllListeners()](#removealllisteners)
    * [findListeners()](#findlisteners)
  * [TimerManager](#timermanager)
    * [createTimeout()](#createtimeout)
    * [createInterval()](#createinterval)
    * [createLoop()](#createloop)
    * [deleteTimer()](#deletetimer)
    * [deleteAllTimers()](#deletealltimers)
  * [AttributeManager](#attributemanager)
    * [createAttribute()](#createattribute)
    * [deleteAttribute()](#deleteattribute)
    * [getAttribute()](#getattribute)
  * [UnitManager](#unitmanager)
    * [createUnit()](#createunit)
    * [deleteUnit()](#deleteunit)
    * [parseStyleValue()](#parsestylevalue)
  * [Observer](#observer)
    * [checkChildren()](#checkchildren)
    * [checkAttributes()](#checkattributes)
  * [PluginManager](#pluginmanager)
    * [addPlugin()](#addplugin)
    * [removePlugin()](#removeplugin)
    * [initializePlugins()](#initializeplugins)
  * [ComponentManager](#componentmanager)
    * [registerComponent()](#registercomponent)
    * [unregisterComponent()](#unregistercomponent)
    * [getComponent()](#getcomponent)
    * [getComponentFromParent()](#getcomponentfromparent)
  * [StyleManager](#StyleManager)
    * [createStyle()](#createstyle)
    * [updateStyles()](#updatestyles)
  * [getElementByID()](#getelementbyid)
  * [getElementsByClassName()](#getelementsbyclassname)
  * [getElementsByTagName()](#getelementsbytagname)
  * [getAllElements()](#getallelements)
  * [load()](#load)
  * [remove()](#remove)

# Core
You can only access the Core instance via the plugin API.

## Getters
* `id <string>` | The ID of the component
* `element <HTMLElement>` | The element that the component is mounted onto.
* `API` | The upper [Component API](/document?page=API%2FLight&header=light3).
* `data` | Extra data held by the component.

## Setters
* `data` | Extra data held by the component.

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

# ListenerManager
ListenerManager is a module used to manage all the listeners within the component script.

## listen()
```ts
.listen(<target>, <name>, <callback>, <options>) // Listen to an event
```
* `target <any>` | The target that you want to listen on.
* `name <string>` | The name of the event.
* `callback <function>` | The callback of the event.
* `options <undefined | object>` | The options for the listener.
  * `tag <undefined | string>` | The tag of the listener. (Can be used to find the listener.)
  * `once <undefined | boolean>` | Ｗhether the event should trigger once.

> return `<string>` (The ID of the listener)

## removeListener()
```ts
.removeListener(<id>) // Remove a listener
```
* `id <string>` | The ID of the listener.

> return `<boolean>`

## removeAllListeners()
```ts
.removeAllListeners() // Remove all the listeners
```

> return `<boolean>`

## findListeners()
```ts
.findListeners(<target>, <query>)
```
* `target <any>` | The target that the listener is on.
* `query` | The query.
  * `name <undefined | string>` | The name of the event.
  * `tag <undefined | string>` | The tag of the listener.

> return `<string[]>` (A list of listener IDs)

# TimerManager
TimerManager is a module used to manage all the timers within the component script.

## createTimeout()
```ts
.createTimeout(<ms>, <callback>) // Create a timeout
```
* `ms <number>` | The duration of the timeout.
* `callback <function>` | The callback of the timeout.

> return `<string>` (The ID of the timer)

## createInterval()
```ts
.createInterval(<interval>, <callback>) // Create an interval
```
* `interval <number>` | The interval.
* `callback <function>` | The callback of the interval.

> return `<string>` (The ID of the timer)

## createLoop()
```ts
.createLoop(<times>, <interval>, <callback>, <callback2>) // Create a loop with interval
```
* `times <number>` | The number of times you want to loop.
* `interval <number>` | The interval between each iteration.
* `callback <function>` | The callback for each iteration of the loop.
* `callback2 <undefined | function>` | The callback of end of the loop.

> return `<string>` (The ID of the timer)

## deleteTimer()
```ts
.deleteTimer(<id>) // Delete a timer
```
* `id <string>` | The ID of the timer

> return `<undefined>`

## deleteAllTimers()
```ts
.deleteAllTimers() // Delete all timers
```

> return `<undefined>`

# AttributeManager
AttributeManager is a module used to manage all the special attributes within the component.

## createAttribute()
```ts
.createAttribute(<name>, <callback>, <update>) // Create an attribute
```
* `name <string>` | The name of the attribute.
* `callback <function>` | The callback of the attribute. The callback will receive the following parameters: `(element: HTMLElement, value: string)`
* `update <undefined | boolean>` | Whether the observer should update all the children of the mounted element after the attribute is created. `Default: false`

## Example
```ts
Core.AttributeManager.createAttribute('log', (element, value) => console.log(value)
```

Every special attribute start with `light:`, so to use it in HTML, it'll look something like:
```html
<div light:log="Hello World"></div>
```

> return `<undefined>`

## deleteAttribute()
```ts
.deleteAttribute(<name>, <update>) // Delete an attribute
```
* `name <string>` | The name of the attribute.
* `update <undefined | boolean>` | Whether the observer should update all the children of the mounted element after the attribute is deleted. `Default: false`

> return `<undefined>`

## getAttribute()
```ts
.getAttribute(<name>) // Get attribute
```

> return `<undefined | ((element: HTMLElement, value: string) => any)>` (The callback of the attribute)

# UnitManager
UnitManager is a module used to manage all the custom style units within the component.

## createUnit()
```ts
.createUnit(<name>, <callback>, <update>) // Create a unit
```
* `name <string>` | The name of the unit.
* `callback <function>` | The callback function for the attribute. The callback will receive a `<string>` and should return a `<string>` as well.
* `update <undefined | boolean>` | Whether the observer should update all the children of the mounted element after the unit is created. `Default: false`

> return `<undefined>`

## deleteUnit()
```ts
.deleteUnit(<name>, <update>) // Delete a unit
```
* `name <string>` | The name of the unit.
* `update <undefined | boolean>` | Whether the observer should update all the children of the mounted element after the unit is deleted. `Default: false`

> return `<undefined>`

## parseStyleValue()
```ts
.parseStyleValue(<value>) // Parse style value
```
* `value <string>` | The style that you want to parse. (This will apply all the special units to the style)

## Example
```ts
Core.UnitManager.parseStyleValue('font-size: [2.5ps]') // Result: "font-size: calc(calc(1vw + 1vh) * 2.5)"
```

> return `<string>`

# Observer
Observer is a module used to observe changes in the component.

## checkChildren()
```ts
.checkChildren(<element>) // Check the children of the element
```

> return `<undefined>`

## checkAttributes()
```ts
.checkAttributes(<element>, <attributeName>) // Check the attributes of the element
```
* `element <HTMLElement>` | The element that you want to check.
* `attributeName <undefined | string>` | The name of the attribute that you want to check. If it receives undefined, it'll check all the attributes.

> return `<undefined>`

# PluginManager
PluginManager is a module used to manage all the plugins.

## addPlugin()
```ts
.addPlugin(<Plugin>) // Add a plugin
```
* `Plugin <object>` | The plugin that you want to add.
  * `id <string>` | The ID of the plugin.
  * `register <undefined | function>` | The register function of the plugin. The function will receive the following parameters: `(API: typeof Light, Utilities: Utilities)`
  * `init <undefined | function>` | The initialize function of the plugin. The function will receive the following parameters: `(Core: Core)`

> return `<undefined>`

## removePlugin()
```ts
.removePlugin(<id>) // Remove a plugin
```
* `id <string>` | The ID of the plugin

> return `<undefined>`

## initializePlugins()
```ts
.initializePlugins(<Core>) // Initialize plugins
```
* `Core <Core>` | Initialize plugins on a [Core](#core).

> return `<undefined>`

# ComponentManager
ComponentManager is a module used to manage all the components.

## registerComponent()
```ts
.registerComponent(<Core>) // Register a component
```
* `Core <Core>` The [Core](#core). of the component.

> return `<string>` (The ID of the component)

## unregisterComponent()
```ts
.unregisterComponent(<id>) // Unregister A component
```
* `id <string>` The ID of the component.

> return `<undefined>`

## getComponent()
```ts
.getComponent(<id>) // Get a component
```
* `id <string>` | The ID of the component.

> return `<undefined | Core>`

## getComponentFromParent()
```ts
.getComponentFromParent(<element>) // Get component from parent
```
* `element <HTMLElement>` | The element from which you want to get the component it's in.

> return `<undefined | string>` (The ID of the component)

# StyleManager
StyleManager is a module used to manage all the compiled styles. (Light-Framework usez CSS classes to apply style to elements.)

This module will create a new style tag containing all compiled styles.

## createStyle()
```ts
.createStyle(<style>, <type>, <idFormat>) // Create a style
```
* `style <string>` | The style that you want to create.
* `type <type>` | The type of the style.
* `idFormat` | The format of the page ID.

## Example
```ts
Core.StyleManager.createStyle('width:calc(calc(10vw + 10vh) * 2.5ps);height:calc(calc(10vw + 10vh) * 2.5ps', 'hover', 'hover-<id>:hover')
```

> return `<string>` (The ID of the style.)

## updateStyles()
```ts
.updateStyles() // Update styles (Update all compiled styles)
```

> return `<undefined>`
