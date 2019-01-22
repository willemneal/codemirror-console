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

## Function Types
Functions are maps from a vector of parameter types and
{% console %}{% endconsole %}
```ts
let i = (x: i32): i32 -> (x); // i32 -> i32
let iv = (x: i32): void -> (); //  i32 -> void
function identity(x: i32): i32 {
  return x
}
```
```js
console.log(mod.text);
```


<!-- Furthermore there instructionsinstruction there are instructions that operate on smaller bit widths:

- u16/i16
- u8/i8
- bool - 1 bit -->
