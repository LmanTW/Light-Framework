# Create A Special Attribute
You can create a special attribute using the [AttributeManager](/document?page=API%2FCore&header=attributemanager).

```ts
const Plugin = {
  id: 'myPlugin',

  init: (Core) => {
    Core.AttributeManager.createAttribute('log', (element, value) => console.log(value))
  }
}
```

Every special attribute start with `light:`, so to use it in HTML, it'll look something like:
```html
<!--Assume this is in the component-->

<div light:log="Hello World"></div>
```
