# Special HTML Attributes
Light-Framework adds special attributes to [HTML](https://en.wikipedia.org/wiki/HTML). These attributes all start with `light:` and can be added through plugins.

## Built In Attributes

### light:style
It's like the `style` attribute, but with extra functionality like: `custom unit`, `webkit compatibility`, and some special property.

* Short CSS Variable | You can use this by using `[$<name>]` (Same as `var(<name>)`).
* Custom Unit | You can use this by using `[<number><unitName>]`.

### light:style:hover
It's like the `light:style` attribute, but only apply the style when hover.

### light:trigger
It's like the `onclick` attribute, but you can set the trigger to an URL, path, or [Javascript](https://en.wikipedia.org/wiki/JavaScript) code.

```js
// URL
light:trigger="https://www.google.com/"

// Path
light:trigger="/page2.html"

// 
light:trigger="/page2.html"
```
