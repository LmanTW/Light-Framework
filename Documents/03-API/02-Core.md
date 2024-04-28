# Core
The private API of Light-Framework. Core is the hidden API under the [Component API](/document?page=API%2FLight&header=light3), it has control over the whole component.

* [Core()](#core)
  * [ListenerManager](#listenermanager)
    * [listen()](#listen)
    * [removeListener()](#removelistener)
    * [removeAllListeners()](#removealllisteners)
    * [findListeners()](#findlisteners)
  * [TimerManager](#listener)
  * [AttributeManager](#attributemanager)
  * [UnitManager](#unitmanager)
  * [Observer](#observer)

# Core
You can only access the Core instance via the plugin API.

# ListenerManager

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
