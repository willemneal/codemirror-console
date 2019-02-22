# Builtins

Instructions in WebAssembly can be thought of as functions.  Their input is the current stack, memory, local variables, and the current position within the function. Their output is to possibly change one of those.

AssemblyScript provides builtin functions and syntax which are then directly translated into WebAssembly.  This is a very handy feature, because writing directly in WebAssembly is not very easy and tedious.

Let's look at some examples:

Value types:
{% console %}{% endconsole %}
```ts
let w: i32 = <i32> 42
let x: f32 = <f32> 42.0
let y: i64 = <i32> 42
let z: f64 = <f32> 42.0
```
```js
console.log(getSection(mod.text, "global"));
```

{% console %}{% endconsole %}
```ts
let left = 32;
let right = 4;
//i32.add
<i32>left + <i32>right;
//i32.sub
<i32>left - <i32>right;
//i32.mul
<i32>left * <i32>right;
//i32.div_s
<i32>left / <i32>right;
//i32.div_u
<u32>left / <u32>right;
//i32.rem_s
<i32>left % <i32>right;
//i32.rem_u
<u32>left % <u32>right;
//i32.and
<i32>left & <i32>right;
//i32.or
<i32>left | <i32>right;
//i32.xor
<i32>left ^ <i32>right;
//i32.shl
<i32>left << right;
//i32.shr_s
<i32>left >> right;
//i32.shr_u
<u32>left >> right or <i32>left >>> right;
//i32.rotl
rotl<i32>(value, shift);
//i32.rotr
rotr<i32>(value, shift);
//i32.eq
<i32>left == <i32>right;
//i32.ne
<i32>left != <i32>right;
//i32.lt_s
<i32>left < <i32>right;
//i32.lt_u
<u32>left < <u32>right;
//i32.le_s
<i32>left <= <i32>right;
//i32.le_u
<u32>left <= <u32>right;
//i32.gt_s
<i32>left > <i32>right;
//i32.gt_u
<u32>left > <u32>right;
//i32.ge_s
<i32>left >= <i32>right;
//i32.ge_u
<u32>left >= <u32>right;
//i32.clz
clz<i32>(value);
//i32.ctz
ctz<i32>(value);
//i32.popcnt
popcnt<i32>(value);
//i32.eqz
!<i32>value;
```
```js
console.log(mod.text);
```
