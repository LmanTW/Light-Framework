# Create A Custom Style Unit
You can create a special attribute using the [UnitManager](/document?page=API%2FCore&header=unitmanager).

```ts
const Plugin = {
  id: 'myPlugin',

  init: (Core) => {
    Core.UnitManager.createUnit('big', (value) => `calc(100ps * ${value})`)

  }
}
```

```html
<!--Assume this is in the component-->

<div light:style="width: [1.5big]; height: [1.5big]"></div>
```
