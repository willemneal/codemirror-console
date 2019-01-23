# Memory
As we saw in the previous section a function has a set of local variables that can be read and updated.  However, when the function returns those values are thrown away.  To allow data to persist a WebAssembly module has a memory section, which is just a big array of bytes.


## classes

Classes in AS are very simple compared to classes in other languages.  An instance of a class is a memory reference to a collection of instance variables.


{% console %}{% endconsole %}
```ts
class Foo {
  x: i32 = 10
}
let f = new Foo();
```
```js
console.log(mod.text);
```
