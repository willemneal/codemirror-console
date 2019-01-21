# Virtual Machines

Like many terms in computer science *Virtual Machine* is an overloaded term.  The application people are often most familiar with is a virtualized physical machine.  Software like *VMware* or *OpenBox* emulate the architecture of a machine and connected devices.  Modern hardware even have special virtualization instructions that allow the virtual machine to run instructions at the hardware level instead of each instruction being emulated.

The second application of a virtual machine is a called a Process Virtual Machine[^1], which is program that provides a platform-independent environment to run other programs.  This is a powerful abstraction and frees developers from needing to worry about what host architecture and operating system their program is running on.  A good example of this is the Java Virtual Machine (JVM), which interprets compiled Java bytecode.

## JVM and JRE

The JVM is a stack machine, which means that each java bytecode instruction performs operations on a stack of data.  Let's look at an example:

```java
int i = 1;
int j = 2;
int k = i + j;
```
This translates to the following bytecode
```java
iconst_1  // put constant 1 on the stack
istore_1  // pop 1 off stack and store it as a local variable indexed at 1
iconst_2
istore_2
iload_1   // put value at index 1 onto stack
iload_2
iadd      // pop both values off the stack and push their sum on the stack
istore_3
```

This is very different than a low level assembly instruction set which requires references to memory locations and registers.  This makes it easier to generate code from your source language since you only have to worry about your local stack.

### Java Runtime Environment

To actually run the bytecode you need a Java Runtime Environment (JRE), which handles all of the stack operations.  It also provides high level features for the language such as Input/Output (I/O), a class loader, and garbage collection.  These features allow the bytecode to interact with the host machine and manages all of the objects created during execution.

Another important feature that the JRE supports, and one that is the biggest reason for its success, is Just-In-Time (JIT) Compilation.  Executing the bytecode above could easily be translated to native assembly code because the variables are all integers.  However, since Java has classes and polymorphism (e.g. method overloading) it is not always so easy.  This means that 


[^1]: Again this can be broken down into a language VM and an environment VM like wine, which emulates a windows environment for UNIX systems.
