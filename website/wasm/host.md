# Host Environment

So far we've looked at code that doesn't interact with the outside world.  To handle this WebAssembly has two special sections: `imports`, `exports`.  Furthermore there is a standard [JavaScript API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly) for compiling, instantiating, and interacting with a WebAssembly module.

## Exports

Let's first take a look at how you export a function from assemblyscript.

{% console %}{% endconsole %}
```ts
export function addOne(i: i32): i32 {
  return i + 1;
}
```
```js
console.log(mod.text);
let module = new WebAssembly.Module(mod.binary);
let instance = new WebAssembly.Instance(module);
//now we can call the exported function
console.log(instance.exports.addOne(41));
```

The next step is compiling and instantiating this module.
```js
let mod = new WebAssembly.Module(bufferSource);
let instance = new WebAssembly.Instance(mod);
//now we can call the exported function
console.log(instance.exports.addOne(41));
```
