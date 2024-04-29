# Setup A Plugin
A plugin is basically just a `<object>`, so let's create one:
```ts
const Plugin = {
  id: 'myPlugin', // The ID of the plugin (Required)

  register: (API, Utilities) => {}, // The register function of the plugin
  init: (Core) => {} // The initialize function of the plugin
}
```

Now we have a blank plugin, let's add it to Light-Framework:
```ts
Light.use(Plugin)
```
