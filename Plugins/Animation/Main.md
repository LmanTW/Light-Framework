# Animation
Provides functionalities for creating transformations and keyframes

* This plugin uses [animejs](https://animejs.com/), which is absolutely amazing!

## Installation
```js
// Import From [framework.light.tw]
import Animation from 'https://framework.light.tw/Asset/Plugin/Animation.mjs'

// Import From jsDelivr (May not be the newest version)
import Animation from 'https://cdn.jsdelivr.net/gh/LmanTW/Light-Framework/Plugins/Animation/Main.mjs'
```

## Use The Plugin
```js
Light.use(Animation)
```

# JavaScript API

* [Animation](#animation)
  * [transform()](#transform)
  * [keyframe()](#keyframe)

# Animation
```js
import Light from 'https://framework.light.tw/Asset/Light.mjs'

import Animation from 'https://framework.light.tw/Asset/Plugin/Animation.mjs'

Light.use(Animation)
```

## transform()
```js
Light.Animation.transform(<target>, <transforms>, <options>) // Create a transformation animation
```
* `target <array[HTMLElement] || HTMLElement>` | Target that you want to apply transforms
* `transforms <object>` | Values that you want to transform
* `options <undefined || object>` | https://animejs.com/documentation/#duration


### Example
```js
let element = document.getElementById('anElement')

// Apply transfom to element
Light.Animation.transform(element, {
  'style.width': [0, 100] // Start value and end value
}, { duration: 1000 })
```

## keyframe
```js
Light.Animation.keyframes(<target>, <keyframes>, <options>) // Create a keyframes animation
```
* `target <array[HTMLElement] || HTMLElement>` | Target that you want to apply transforms
* `keyframes <array>` | Keyframes
* `options <undefined || object>` | https://animejs.com/documentation/#duration

### Example
```js
let element = document.getElementById('anElement')

// Apply keyframes to element
Light.Animation.keyframes(element, [
  { 'style.width': 0 },
  { 'style.width': 100 },
  { 'style.width': 50 },
  { 'style.width': 150 },
  { 'style.width': 0 }
], { duration: 1000 })
```
