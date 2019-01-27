# WebAssembly

The WebAssembly spec[^1] defines each instruction and a module, which is a binary or a text format.  The spec is well written and a great reference, but instead of repeating it we'll learn through examples of the text format.

As a first example, let's look at what an empty AssemblyScript compiles to.
```
(module
 (type $v (func))
 (memory $0 0)
 (table $0 1 anyfunc)
 (elem (i32.const 0) $null)
 (global $HEAP_BASE i32 (i32.const 8))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (func $null (; 0 ;) (type $v)
 )
)
```
Let's break it down line by line
- Unsurprisingly `(module...` defines a wasm module.
- `type $v (func)` - the type of `$v` is a function that takes no parameters and returns nothing.
- `(memory $0 0)` - a memory named `$0`, which has a minimum size of 0[^2].
- `(table $0 1 anyfunc)` - a table named `$0` with `1` entry which is ["a function with any signature"](https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md)[^2].
- `(elem (i32.const 0) $null)` - the function name `$null` is the first entry in the table'.[^3]
- `(global $HEAP_BASE i32 (i32.const 8))`- a global constant named `$HEAP_BASE` is a 32 bit integer with a value of 8.[^4]
- `(export "memory" (memory $0))` - an export name "memory" with the value of the memory name `$0`.
- `(func $null (; 0 ;) (type $v))` - a function named `$null`, which takes no parameters, returns nothing, has an empty body and has type `$v`.[^5]

This is a lot at once, but we'll look at more examples in depth and you'll be reading WebAssembly files like a pro.



[^1]:[Original Paper](https://people.mpi-sws.org/~rossberg/papers/Haas,%20Rossberg,%20Schuff,%20Titzer,%20Gohman,%20Wagner,%20Zakai,%20Bastien,%20Holman%20-%20Bringing%20the%20Web%20up%20to%20Speed%20with%20WebAssembly.pdf) and the [w3c spec](http://webassembly.github.io/spec)

[^2]: Currently a module can only have one but eventually more will be allowed.

[^3]: Technically it should be `(elem 0 (i32.const 0) $null)`, but since there currently a max of one table the `0` is dropped.

[^4]: To make it mutable change `i32 -> mut i32`.

[^5]: `;;` allows inline comments in the text format.
