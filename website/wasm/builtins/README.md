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

# Arthimetic Operations

{% console %}{% endconsole %}
```ts
declare function print(a: i32, b: i32, c: i32, op: string): void;
export function main(): void{}
let left = 32;
let right = 4;
let value = 17;
let shift = 3;
//i32.add
print(left, right, <i32>left + <i32>right, "i32.add");
print(left, right, <i32>left - <i32>right, "i32.sub")
print(left, right, <i32>left * <i32>right, "i32.mul")
print(left, right, <i32>left / <i32>right, "i32.div_s")
print(left, right, <u32>left / <u32>right, "i32.div_u")
print(left, right, <i32>left % <i32>right, "i32.rem_s")
print(left, right, <u32>left % <u32>right, "i32.rem_u")
print(left, right, <i32>left & <i32>right, "i32.and")
print(left, right, <i32>left | <i32>right, "i32.or")
print(left, right, <i32>left ^ <i32>right, "i32.xor")
print(left, right, <i32>left << right, "i32.shl")
print(left, right, <i32>left >> right, "i32.shr_s")
print(left, right, <u32>left >> right, "i32.shr_u");
print(left, right, <i32>left >>> right, "i32.shr_u")
print(value, shift, rotl<i32>(value, shift), "i32.rotl")
print(value, shift, rotr<i32>(value, shift), "i32.rotr")
print(left, right, <i32>left == <i32>right, "i32.eq")
print(left, right, <i32>left != <i32>right, "i32.ne")
print(left, right, <i32>left < <i32>right, "i32.lt_s")
print(left, right, <u32>left < <u32>right, "i32.lt_u")
print(left, right, <i32>left <= <i32>right, "i32.le_s")
print(left, right, <u32>left <= <u32>right, "i32.le_u")
print(left, right, <i32>left > <i32>right, "i32.gt_s")
print(left, right, <u32>left > <u32>right, "i32.gt_u")
print(left, right, <i32>left >= <i32>right, "i32.ge_s")
print(left, right, <u32>left >= <u32>right, "i32.ge_u")
print(value, 0, clz<i32>(value), "i32.clz")
print(value, 0, ctz<i32>(value), "i32.ctz")
print(value, 0, popcnt<i32>(value), "i32.popcnt")
print(value, 0, !<i32>value, "i32.eqz")
```
```js
// console.log(mod.text);
var instance;
let imports = {
  input: {
    print : (a, b, c, op) => {
      let bin = (x) => {
        res = (x>>>0).toString(2)
        return res.padStart(32, "0");
      }
      console.log(`\n${bin(a)}\n${instance.getString(op)}\n${bin(b)}\n${"-".repeat(32)}\n${bin(c)}`);
    }
  }
}
let module = new WebAssembly.Module(mod.binary);
instance = loader.instantiate(module, imports);
instance.main();
```
