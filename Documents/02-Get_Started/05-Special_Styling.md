# Special Styling
You can use spcial styling via the `light:style` [special attribute](/document?page=Get%20Started%2FSpecial%20Attributes), you can use special styling like:
```html
<div light:style="background-color: [$color]; width: [10ps]; height: [10ps]"></div>
```

## Special Properties
Special properties cannot be added via the plugin API.

* `center` | Center the children on `row`, `column` or both dimensions. (This needs `display: flex` to be able to work.)

## Special Units
Special unit allows you to create custom units using the plugin API, the syntax looks like this `[<value><unit name>]`.

* `ps` | Stand for "page size", the formula is `calc(calc(1vw + 1vh) * value)`.

* `$` | This is a bit different from special unit, this is for accessing CSS variables. (The syntax looks like this `[$<variable name>]`)
