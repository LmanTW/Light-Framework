# Core
The private API of Light-Framework. Core is the hidden API under the [Component API](/document?page=API%2FLight&header=light3), it has control over the whole component.

* [Core()](#core)
  * [ListenerManager](#listenermanager)
    * [listen()](#listen)
    * [removeListener()](#removelistener)
    * [removeAllListeners()](#removealllisteners)
    * [findListeners()](#findlisteners)
  * [TimerManager](#listener)
    * [createTimeout()](#createtimeout)
    * [createInterval()](#createinterval)
    * [createLoop()](#createloop)
    * [deleteTimer()](#deletetimer)
    * [deleteAllTimers()](#deletealltimers)
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

# TimerManager

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
