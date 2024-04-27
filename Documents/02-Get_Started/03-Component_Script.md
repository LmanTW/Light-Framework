# Component Script
You can run a script in a component by adding a script tag into the HTML that you'll load into the component:

* `component.ts`
```html
<h1>Hello World</h1>

<script>
  console.log('Hello World')
</script>
```

The script will be run in a [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), so it's not actually a "script" tag, there for some behavior may be different.

## Access To APIs
When running a component script, `Light` and `Component` APIs will be automatically imported.

## Module Importing
If you want to import another module in a component script, you need to set `type="module"` (This will also make the outer scope async.) and there will be a `Import` function:

* `module.js`
```js
function log (content) {
  console.log(content)
}

export { log }
```

* `component.ts`
```html
<script type="module">
  const module = await Import('./component')
                               ^ relative path importing won't work if you didn't provide the `componentPath` when loading the component
</script>
```

If you want to import a default module, it may be a bit different:

* `module.js`
```js
export default (content) => {
  console.log(content)
}
```

* `component.ts`
```html
<script type="module">
  const module = (await Import('./component')).default
                               ^ relative path importing won't work if you didn't provide the `componentPath` when loading the component
</script>
```
