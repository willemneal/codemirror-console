# Memory

In languages like Java Random Access Memory is abstracted away.  When you create an object, the language runtime handles the creation of the object and you don't have a way to know what memory location it is located.  However, in languages like C, you have direct access to memory, but the creation of an object, region of memory, is manual.

## Arrays in JavaScript
Unlike C, an array in JavaScript is not simply a contiguous region of memory like in C, rather it's an array of objects, e.i. references.  For example:

```js
var array = [42, "Hello World", true];
```
Since JavaScript is dynamically typed, each access in the array must unbox the type, which is expensive and hard to optimize.  To solve this typed arrays where added to JavaScript.

```js
var byteArray = new Uint8Array(4);
byteArray[0] = 0xFE;
byteArray[1] = 0xED;
byteArray[2] = 0xFA;
byteArray[3] = 0xCE;
```
Now the compiler knows that each element is an unsigned 8 bit integer, thus each access no longer requires unboxing.  This allowed applications in the browser to efficiently operate on large regions of memory.

## Memory in WebAssembly

WebAssembly took this a step further and has just one big Typed Array for it's "memory".  Then memory instructions can load and store values form and to the array.  This memory can be imported and exported.  Let's look at it exported first.

{% console %}{% endconsole %}
```ts
export {memory}
/*  JavaScript - assume instance has been
let module = new WebAssembly.Module(binary);
let instance = new WebAssembly.Instance(module, imports);
console.log(instance.exports.memory)
let byteArray = new Uint8Array(instance.exports.memory.buffer);
console.log(byteArray)
*/
```
```js
console.log(getSection(mod.text, "export").join('\n'))
let module = new WebAssembly.Module(mod.binary);
let instance = new WebAssembly.Instance(module, {});
console.log(instance.exports.memory);
debugger;
var byteArray = new Uint8Array(instance.exports.memory.buffer);
console.log(byteArray);
```
