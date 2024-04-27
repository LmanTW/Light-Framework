# Component Script
You can run a script in a component by adding a script tag into the HTML that you'll load into the component:

* `component.ts`
```html
<h1>Hello World</h1>

<script>
  console.log('Hello World')
</script>
```

The script will be run in a [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), so it's not actually a "script" tag, there for some behavior may be missing.
