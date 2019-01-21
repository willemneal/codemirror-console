#Types

WebAssembly primitives are only number types:

- u32 - unsigned 32 bit integer
- i32 - signed 32 bit integer
- u64 - unsigned 64 bit float
- i64 - Signed 64 bit float

However, there are instructions that operate on smaller bit widths:

- u16/i16
- u8/i8
- bool - 1 bit

{% console %}{% endconsole %}
```ts
let u_32: u32 = 42;
let i_32: i32 = 42;
let u_64: u64 = 42;
let i_64: u64 = 42;
```
```js
console.log(mod.text);
```
