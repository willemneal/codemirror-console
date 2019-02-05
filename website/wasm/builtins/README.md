# Builtins

Instructions in WebAssembly can be thought of as functions.  Their input is the current stack, memory, local variables, and the current position within the function. Their output is to possibly change one of those.

AssemblyScript provides builtin functions and syntax which are then directly translated into WebAssembly.  This is a very handy feature, because writing directly in WebAssembly is not very easy and tedious.

Let's look at some examples:

{% console %}{% endconsole %}
```ts
store<i32>(0,10);
let x = load<i32>(0);
```
```js
console.log(getFuncSection(mod.text));
```
