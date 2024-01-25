# HTML
* [Special HTML Attributes](#special-html-attributes)
  * [light:style](#lightstyle)
  * [light:style:hover](#lightstylehover)
  * [light:trigger](#lighttrigger)

# Special HTML Attributes
Light-Framework adds special attributes to [HTML](https://en.wikipedia.org/wiki/HTML). These attributes all start with `light:` and can be added through plugins.

## light:style
It's just like the `style` attribute, but with extra functionality like: `custom unit`, and some special property.

* Short CSS Variable | You can use this by using `[$<name>]` (Same as `var(--<name>)`).
* Custom Unit | You can use this by using `[<number><unitName>]`.
* Special CSS Property
  * `center` | You can use the `center` property to center the content in the element, the value can be `row`, `column`, or both (with a space between two value)
 
## light:style:hover
It's just like the `light:style` attribute, but only apply the style when hover.

## light:trigger
It's just like the `onclick` attribute, but you can set the trigger to an URL, path, or [Javascript](https://en.wikipedia.org/wiki/JavaScript) code:

```js
// URL
light:trigger="https://www.google.com/"

// Path
light:trigger="/google.html"

// JavaScript code 
light:trigger="console.log('Google')"
```
