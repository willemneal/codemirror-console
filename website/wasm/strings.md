# Strings

Since WebAssembly has no notion of characters, strings can be encoded in many different ways.  However, the WebAssembly Module encodings do use strings for names, which is encoded in Unicode.

## Unicode
For a long time encoding strings in ASCII was perfectly acceptable.  Most people wrote code in english, particularly those who wrote C and Unix.  However, as more alphabets needed representation Unicode was invented.

With ASCII each character was a set width, so you could just interpret each byte.
