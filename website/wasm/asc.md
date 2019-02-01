# Memory
As we saw in the previous section a function has a set of local variables that can be read and updated.  However, when the function returns those values are thrown away.  To allow data to persist a WebAssembly module has a memory section, which is just a big array of bytes.


## Classes

Classes in AS are very simple compared to classes in other languages.  An instance of a class is a memory reference to a collection of instance variables.

{% console %}{% endconsole %}
```ts
class Foo {
  x: i32 = 10
  foo(i:i32):i32{
    return this.x + i;
  }
}
let f = new Foo();
let x = f.x;
let y = f.foo(x);
```
```js
console.log(mod.text);
```

## Generics
Generics allow for classes and functions to become more general and used other types.  For example, we can generalize the Foo class we defined above.

{% console %}{% endconsole %}
```ts
class Foo<T> {
  x: T;
  constructor(x: T){
    this.x = x;
  }
  foo(i: T): T{
    return this.x + i;
  }
}
let f = new Foo<i32>(10);
let y = f.foo(1);
```
```js
console.log(mod.text);
```
Here `T` is a type variable, which must be specficied when constructing the class.  Generics are very useful especially with defining containers like arrays and maps.  You will seem them used frequently
