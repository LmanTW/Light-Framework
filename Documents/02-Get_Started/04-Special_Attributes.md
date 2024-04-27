# Special Attributes
Light-Framework has some built-in special HTML attributes, and you can easily add more via the plugin API. Special attributes only exist under components, and different component can have different special attributes.

## Styling
* `light:style="<style>"` | It's just like a normal style attribute, but you can use special properties and custom units.
* `light:style:hover="<style>"` | Similar to `light:style`, but only applies the style when the element is hovered. (This can work with [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition))
* `light:style="<style>"` | Similar to `light:style`, but only applies the style when the mouse is holding the element. (This can work with [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition))

## Navigating
* `light:trigger="<URL>"` | This will open the URL in a new tab when the element is clicked.
* `light:url="<URL>"` | This will add a URL to the element, so users can right click the element to get options like "Open the URL in a new tab".

Both attributes can only set once, and may have some problems when changing the element's children after the attribute is computed. This is how they works:

* Before the attribute is computed:
```html
<div light:trigger="https://google.com">
  <h1>Open Google</h1>
<div>
```

* After the attribute is computed:
```html
<div light:trigger="https://google.com">
  <a target="_blank" style="all:unset">
    <h1>Open Google</h1>
  </a>
<div>
```
