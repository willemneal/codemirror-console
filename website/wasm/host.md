# Host Environment

So far we've looked at code that doesn't interact with the outside world.  To handle this WebAssembly has two special sections: `imports` and `exports`.  Furthermore there is a standard [JavaScript API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly) for compiling, instantiating, and interacting with a WebAssembly module.

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

## Imports

This is probably the longest you've had to wait for a `hello world` example, but I hope it will be worth the wait.  The first step is to declare a function, which the compiler will convert to an import.
{% console %}{% endconsole %}
```ts
declare function print(s: String): void;

print("hello world");
```
```js
console.log(getSection(mod.text, "import").join('\n'));
```

Now we need to create the host function in JavaScript and pass it to the instance.

```js
let imports = {
  "index": {
    function print(str) {
      console.log(str)
    }
  }
}
let mod = new WebAssembly.Module(bufferSource);
let instance = new WebAssembly.Instance(mod, imports);
//Once initialized the start function is called
```

Now let's run it.

{% console %}{% endconsole %}
```ts
declare function print(s: String): void;

print("hello world");
```
```js
let imports = {
  "input": {
    "print": (str)=> {
      console.log(str);
    }
  }
}
let module = new WebAssembly.Module(mod.binary);
let instance = new WebAssembly.Instance(module, imports);
```
----
Since when does `hello world` equal 8?  Well remember `str` in the module is a reference to the string it the module's memory.  So 8 is the memory location of `hello world`.  Since WebAssembly's only value types are integers and floats that's what you're limited to when passing data to and from the host.
