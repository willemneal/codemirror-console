# Arrays

Internally, arrays are back by `arraybuffers`, which are byte arrays.

{% console %}{% endconsole %}
```ts
let array: i8[] = [1,2,4,8,16];
```
```js
console.log(getSection(mod.text, "data").join('\n'));
console.log('(global $input/array (mut i32) (i32.const 24))')
```


This is an array literal, which means the compiler knows it's length and contents.

Let's try to make sense of these bytes starting with the global `$input/array`, which is a reference to memory location 24.  From the data section we know
```
(data (i32.const 24) "\08\00\00\00\05\00\00\00")
```
Which is really two 32 bit integers, `\08\00\00\00` and `\05\00\00\00`.  From our discussion on how strings are [encoded](wasm/strings.md), we can see that these are stored in little endian.  The first integer, 8, is the pointer to the start of the arraybuffer, and the second, 5, is the length of the array.

Next let's look at the layout of the array buffer.
```
(data (i32.const 8) "\05\00\00\00\00\00\00\00\01\02\04\08\10\00\00\00")
```
| Data | Meaning |
|:------:|:------:|
|\05\00\00\00 | Number of bytes (5)|
|\00\00\00\00 | These four bytes are blank[^1] |
|\01 | 1 |
|\02 | 2 |
|\04 | 4 |
|\08 | 8 |
|\10 | 16|
|\00 | 0 |
|\00 | 0 |
|\00 | 0 |

Now wait a minute, what's with these extra zeros?  This is because arraybuffers are allocated to the next power of two after the length of the headers and data.  So here our headers + data are 13 bytes and the next power of two is 16.


[^1]: We'll look at why this is in a later chapter, but it has to deal with how memory is accessed.
