# AssemblyScript

[WebAssembly](https://webassembly.github.io/spec) is a new virtual machine created and supported by the four major browsers.  It's goal is to allow programming languages originally meant to compile to native assembly to run in the browser.  Thus the first major compilers to `.wasm` (the binary format), were for C/C++ and Rust.  WebAssembly's initial successes stemmed from a goal to keep the Minimum Viable Product (MVP) as barebones as possible, e.g. manual memory management and single threaded execution.

Meanwhile Microsoft had been working on `TypeScript`, which adds types to JavaScript, which then compiles to normal javascript to run on the javascript engines, e.g. spidermonkey (firefox), V8 (Chrome & Node).  TypeScript helps large projects to have static guarantees about the correctness of the codebase.

AssemblyScript arose as a subset of TypeScript, which instead of targeting javascript, targeted WebAssembly directly.  This means you can now run a type of javascript at the same speed as C/C++.

The goal of this book is to explain both WebAssembly and AssemblyScript together.  Through out the book you'll see code samples like the one below.  In the first chapter these code samples will show the result of compiling to WebAssembly's text format.



{% console %}{% endconsole %}
```ts
let x = 42;
let y = x + x;
export function getY(): i32 {
  return y;
}
```
```js
console.log(mod.text);
```
