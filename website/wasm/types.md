#Types


## Value Types
WebAssembly primitives are value types

- i32 - 32 bit integer
- i64 - 64 bit integer
- f32 - 32 bit float
- f64 - 64 bit float

Integers are not signed or unsigned, rather their signedness is determined by operations acting on the integer.
{% console %}{% endconsole %}
```ts
let i_32: i32 = 42;
let i_64: i64 = 999999999;
let f_32: f32 = 3.14;
let f_64: f64 = 10.99999 * 10000000;
```
```js
console.log(mod.text);
```
You might have noticed the start function that was created.  This function that called after the WebAssembly module is initialized.  Since these variables are declared at a top level, they're global variables instead of local variables within the function.

## Function Types
Functions are maps from a vector of value types to a vector of value types, e.g. `[i32]->[i32]`.
Let's see what we get when we compile two simple Functions
{% console %}{% endconsole %}
```ts
function identity(x: i32): i32 {
  return x;
}
function i_void(x: i32): void {}
```
```js
console.log(mod.text);
```
That was weird they didn't get compiled.  This is because the default for the assemblyscript compiler is to use tree-shaking compilation, meaning that it only compiles what is referenced.  To do this the compiler starts with the start function and follows all the references.  You can turn this off of course, but you'll have a larger module and compilation will take longer.



So let's add some references to each of these functions. As you'll see below you can functions in AS show up in the function section, which the name from the module, here `input` is the default module.


{% console %}{% endconsole %}
```ts
function identity(x: i32): i32 {
  return x;
}
function i_void(x: i32): void {}

let x = 1;
identity(x);
i_void(x);
```
```js
console.log(mod.text);
```

You can also create anonymous functions, which are placed in the function section.  The big difference is that they are also placed into the table section of the module.  This means `i` will hold a reference to an entry in the function table.  This way when `i(x)` is called it performs a `call_indirect` instruction.

{% console %}{% endconsole %}
```ts
let i  = (x:i32):i32 =>(x);
let iv = (x:i32): void => {return;}
let x = 1;
i(x);
iv(x);
i = (x:i32):i32 => x + x; //Here i is reassigned.
let y = i(x);
```
```js
console.log(mod.text);
```


<!-- Furthermore there instructionsinstruction there are instructions that operate on smaller bit widths:

- u16/i16
- u8/i8
- bool - 1 bit -->
