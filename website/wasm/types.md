#Types

WebAssembly primitives are value types

- i32 - 32 bit integer
- i64 - 64 bit integer
- f32 - 32 bit float
- f64 - 64 bit float

Integers are not signed or unsigned, rather their signedness is determined by operations acting on the integer.
{% console %}{% endconsole %}
```ts
let u_32: u32 = 42;
let i_32: i32 = -42;
let u_64: u64 = 42;
let i_64: i64 = 42;
let i
```
```js
console.log(mod.text);
```


<!-- Furthermore there instructionsinstruction there are instructions that operate on smaller bit widths:

- u16/i16
- u8/i8
- bool - 1 bit -->
