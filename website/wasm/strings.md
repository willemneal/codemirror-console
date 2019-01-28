# Strings

Since WebAssembly has no notion of characters, strings can be encoded in many different ways.  However, the WebAssembly Module encodings do use strings for names, which is encoded in Unicode.

## Unicode
For a long time strings were encoded in ASCII, which used a byte to represent latin letters and common symbols used in English. This was acceptable since most people wrote code in English, particularly C and Unix, however, as more alphabets needed representation Unicode was invented.  Currently there are 1,112,064 unicode [code points](https://en.wikipedia.org/wiki/Code_point), which are numeric values that represent characters or have other meanings like formatting.  The most common version is UTF-8 which encodes 0-127 the same as ASCII, but can use up to three more bytes to encode all code points.

However, JavaScript uses UTF-16, which uses two bytes or four bytes for each code point.  AssemblyScript also uses UTF-16, more specifically UTF-16LE, which is 'little endian'.  Endianness refers how the most significant byte is accessed from memory.

For example, consider the hexadecimal number `0xFEEDFACE`,  the most significant byte is `FE`.  

| Endianness | 0 | 1 | 2 | 3 |
| :-------------: |:-------------:| -----:| :-------------:| :-------------:|
| Little | CE | FA | ED | FE |
| Big | FE | ED | FA | CE |

So little endian means your first index is the littlest byte and big is the opposite.  

Let's look at some code:
{% console %}{% endconsole %}
```ts
let hello = "world";
```
```js
console.log(getSection(mod.text, "data").join('/n'));
```

Now there is a new data section.

`(i32.const 8)`, means starting at memory offset 8 copy the data that follows.

| Data | Meaning |
|:------:|:------:|
|\05\00\00\00 | Number of code points (5)|
|w\00 | Unicode code point 77 (U+0077) |
|o\00 | U+006F |
|r\00 | U+0072 |
|l\00 | U+006C |
|d\00 | U+0064 |
