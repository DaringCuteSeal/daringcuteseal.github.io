---
title: Rust's Ownership System — What I've been Missing Under My Nose
tag:
- programming
- rust
---


# Why Was I So Bad?
I was bad at Rust. I tripped off trying to understand ownership back then, and I'm glad I made a comeback.

Ownership seemed like an alien idea to me, but really, the core concepts are easy to grasp once you know the reasons behind its implementation. I would be explaining my personal mental model of it here.


# What it Is
Rust's ownership system is a system that aims to avoid the possibilities of undefined behaviors during program runtime. This ownership system only exists during compile-time, not during runtime.


## Preventing Duplication
First of all, we know that using pointers is the best way to prevent data duplication in our programming. Imagine a situation where you need to write a function that sorts an array. We can do it like this:

```
define sort_array(array: list<int>) -> list<int>
	// we don't care how it's implemented

define main():
	list_of_number: list<int> = generate_an_array()
	sorted_array = sort_array(clone(list_of_number))
```

This would mean having a list of number at `list_of_number`, then copying it all over again to the `sort_array` function, sorting it at the function, then copying the `int`s all over again so they can be returned to the caller before all the variables inside the function stack gets dropped.

Very cumbersome and memory inefficient. Instead, what if we can do it _in-place_? That means passing down the "actual" original array instead of copying the whole array. But how? **Pointers!**

The implementation of "pointers" differs in programming languages, but they generally mean the same thing: **some value that "points" to a place in memory**. This is generally the address of the memory.

So now, we can sort an array like this:
```
define sort_array(array: list<int>):
	// we don't care how it's implemented

define main():
	list_of_number: list<int> = generate_an_array()
	sort_array(list_of_number)
```

## The Problem of Freeing Unused Memory
In languages like C, all variables will be dropped ("freed", or the address would be marked as usable again) automatically once it goes out of scope. However, memory that we manually allocated (e.g with `malloc`) will not be managed by the language. We have to manually free the memory. This is very bug-prone, however. What will happen if we free the same address twice? What will happen if we _don't_ free the memory? (a [memory leak](https://en.wikipedia.org/wiki/Memory_leak) will occur!)

## Automatic Memory Management
There are several implementations of automatic memory management, notably with a garbage collector. In this scheme, the specific programming language would have to track which memory are still needed and which are no longer needed, so the user of the language wouldn't have to manage the memory on their own.

However, like any other extra addition, this comes at a performance cost. Rust circumvents this need of runtime memory management shenanigans by ensuring that every single Rust code compiled is memory-safe. To do this, Rust implements an **ownership system**.

## Freeing with Condition
Rust **only** frees memory in the heap. This ensures that no double-freeing will occur.

Take this code example, where double-freeing can happen if we don't have an ownership system:
```rust
fn main() {
	// array is a vector with reference to the heap that stores
	// the actual numbers
	let array = vec![10, 20, 30];

	// item also points to the heap??
	let item = array;
}
```

At the end of the scope, both `item` and `array` would be freed together alongside with the memory under the heap. **That's double-freeing!**

> **Box deallocation principle:** If a variable owns a box, when Rust deallocates the variable’s frame, then Rust deallocates the box’s heap memory[^1]


## Moving Out
Any data type (structs) that do not implement the `Copy` trait will be moved out (have the ownership transferred) when reassigned to another variable. In our previous case, that'll mean that `array` no longer owns the vector.

```rust
// Move item to array. array will be invalid after this statement
let item = array;
```

If, however, the item implements the `Copy` trait, then it'll be copied when reassigned.
```rust
fn main() {
	let x: i32 = 100;

	// y will be copy of x (100), not &x
	let y = x;
}
```

## What are Borrows?
Borrowing means making a reference to a variable. That reference is a **non-owning** pointer which means that dropping those variables will not cause the previously allocated memory in heap to get deallocated.

This means that code like this is safe, and will make both `array` and `borrow` valid:
```rust
fn main() {
	let array = vec![1, 2, 3];
	let borrow = &array;
	println!("{}", array[0]); // works
	println!("{}", borrow[0]); // also works
}
```

This is because, at the end of the scope, only the heap's memory of `array` will be freed, because only `array` "owns" the vector.

## Only Read OR Write!
Borrows come in two forms: **mutable** and **immutable** borrow. They are concrete data types (`&T and &mut T`).

Here are the simple rules of Rust's borrow checker:
1. You can have **more than one** immutable borrows at a time.
2. You can *ONLY* have **one** mutable borrow at a time.
3. You can *NOT* have **both** immutable and mutable borrows at a time.

The first one sounds obvious, as you can always have immutable references because you know they will never change. To understand rule 2 and 3, let's take a look at this example code:
```rust
fn main() {
	let mut hello_string = String::from("Hello,");
	let string_borrow = &hello_string; // immutable borrow
	hello_string.push_str(" world!"); // mutable borrow
}
```

Now, it may surprise you that this code _actually_ compiles fine. It looks like we're doing both an immutable borrow and a mutable borrow here, but actually, Rust will invalidate the `string_borrow` when it is mutably borrowed. Thus, the [lifetime](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html) of `string_borrow` ends after `hello_string` is mutably borrowed.

The real issue comes when we try to use `string_borrow` *after* `hello_string` has been borrowed mutably:

```rust
fn main() {
	let mut hello_string = String::from("Hello,");
	let string_borrow = &hello_string; // immutable borrow
	hello_string.push_str(" world!"); // mutable borrow by the push method
	println!("{string_borrow}") // string_borrow is still used
}
```

This code essentially declares that `string_borrow` must live until it is being used by the `println!` statement. That means, **we're borrowing `hello_string` both mutably and immutably at the same time**! Not allowed, nuh-uh.

Now, why is this not allowed? Because, something that accesses a mutable reference may mutate the related data and invalidate another immutable reference. The example above is actually less clear, so we'll take a look at another example.

```rust
fn main() {
	let mut numbers = vec![10, 20, 30];
	let ref_to_20 = &numbers[1]; // immutable borrow
	numbers.push(40); // mutable borrow
	println!("{ref_to_20}"); // use of immutable borrow
}
```

The `numbers` [vector](https://doc.rust-lang.org/stable/std/vec/struct.Vec.html) store the actual numbers on the heap. When it is mutated, e.g by the `push` method above (which borrows `self` as mutable), the `numbers` vector may reallocate the numbers to another place in memory. This will mean that `ref_to_20` that previously referenced a place in the heap will get invalidated after the push!

This reference invalidation is also the reason why you can't have two mutable borrows at once. Mutable borrows are always **unique**.

## `&T` Implements Copy
Immutable references implement the `Copy` trait. This means that the code below:
```rust
fn main() {
	let numbers = vec![1, 2, 3];
	let ref_to_2 = &numbers[1];
	let another_ref = ref_to_2; // copy ref_to_2
	println!("{ref_to_2}");
}
```

Will make both `another_ref` and `ref_to_2` point to the second element of the `numbers` vector.

## `&mut T` Does NOT Implement Copy
Because you can only have one mutable borrow at a time, you cannot copy mutable borrows.

```rust
fn main() {
	let mut numbers = vec![1, 2, 3];
	let ref_to_2 = &mut numbers[1];
	let another_ref = ref_to_2;
	println!("{ref_to_2}"); // invalid, ref_to_2 has been moved
}
```

[^1]: https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html
