---
title: 'I was wrong about TypeScript: Part 1'
description: 'TypeScript is a quirky language, but it can be cool when applied correctly'
date: '2025-09-14'
image: '/post-images/wrong-about-typescript/thumbnail.jpg'
categories:
  - blog
  - tutorial
published: true
---

## TLDR

Typescript is a peculiar language that is far from perfect, however, when spending some time to configure it, it's type system is actually quite good.

This is part one of a two-part article. The first part shows the issues I have with typescript.

The second part can be read [here](/blog/posts/i-was-wrong-about-typescript-2).

## Background

Typescript, also known as the superset of Javascript is quite the language. However, before going into why I was wrong about typescript, I'll give the background of my experience with the language so we can truly appreciate how great the language turned out to be.

My programming jounrey is quite similar to anyone who has a degree in CS. I've done the algorithms and data structures stuff, the network stuff and essentially coding many abstract problems. Most of my programming was done in languages such as Java, Python, and C. After a while I started dabbling into Rust and other languages.

For those unfamilar with Rust, its a systems(or general purpose) programming language that has a strong focus on safety. With this comes vast and strict type system that forces you to think about the code you write and how you use types

This way of coding is something I enjoyed. I'm known to be quite the early abstracter, and I love to setup my code and solutions in a way that makes it easy to use later on in the code(function definitions, type definitions, interfaces, etc.). Rust's strict system forces you to be correct in the way you write the code, but the payoff later was worth it. Perfect autocomplete and type safety throughout the codebase, in addition to also the code working as expected.

## The problems with typescript

The issues with TypeScript isn't something that is inherently a typescript thing, but rather something that is derived from the issues JavaScript has.

Lets look at some of the first issues with typescript.

### No concrete error return types.

Lets take a look at this code

```TypeScript

function fetchData(): {
  const response = await fetch('https://api.example.com/data'); // <- This can throw
  const json = await response.json(); // <- This can also throw
  return JSON.parse(json); // <- This can also throw
}

```

The issue here is that first of all, this function can throw an error in multiple places, but the compiler tells doesn't tell us anything about the fact that this function can error.

If I were to call this function anywhere else, I would not know that it potentially can error until runtime.

We can stop this by wrapping it in a try catch block like this:

```TypeScript
function fetchData(): {
  try {
    const response = await fetch('https://api.example.com/data'); // <- This can throw'
    const json = await response.json(); // <- This can also throw
    return JSON.parse(json); // <- This can also throw
  } catch (e) {
    // Handle the error here
    console.error(e); // Which error was thrown?
  }
}

```

The issue here is that the code is quite verbose, and wrapping everything in a try catch block is quite tedius. Secondly, we have no idea of what kind of error was thrown, or where in the try block it was thrown. Third, as programmers, we shouldn't have to guess when something can throw. So in vanilla typescript, this is a consistent issue that makes it hard to take the language seriously.

### Any is everywhere

My second issue with typescript is the `any` type. I thought that this was a joke when I first saw it. I had a friend who would always say "isn't typescript just javascript with `:any` behind every declaration?"

The crazy part is that this is somewhat true.

Lets take a look at this code:

```TypeScript
// We declare two types with no relation to each other
type User = {
  name: string;
  age: number;
}

type NotUser = {
  id: string;
  email: string;
}

```

```TypeScript
// We then create a function that returns the input and one that tries to cast it

function returnNotUser(user: User) {
  return user; // This is valid, and we get no complaints from the compiler
}

function returnNotUser(user: User) {
  return user as NotUser; // -> Error: Conversion of type 'User' to type 'NotUser' may be a mistake because neither type sufficiently overlaps with the other.
}


```

In the code, we can see that we can't cast a `User` to a `NotUser`, which is great. It tells the programmer that they are doing something wrong, and that we should fix it.

But lets say that I REALLY wanted to cast the User to a NotUser, how would I do that?

```TypeScript

function returnNotUser(user: User) {
  return user as any as NotUser; // This is valid, and we get no complaints from the compiler
}

```

In typecript's not so strict type system, you can cast anything to the `any` type. And from the `any` type, you can cast it to whichever type you wish.

The compiler does not complain about this, despite it being inherently wrong. This is something that will fail at runtime. If we were to access the `id` or `email` property on the returned object, the program would crash.

### Lack of strictness by default

The fact that typescript is not strict essentially removes the benefits of using a type safe language in the first place.

If we were to create a perfect type safe codebase, the coding experience would be great, with auto-completes and type safety throughout the codebase. However, because we can override the strictness, all it takes is one place in the code to remove all of the inferred types and type safety.

Here is another example forcing typescript to not be strict. **The `!!` syntax:**

```typescript
// A function that expects a User obj
function getUserName(user: User | undefined) {
	return user.name; // -> Compiler complains
}

function getUserName(user: User | undefined) {
	if (!user) return; // or handle
	return user.name; // Better practice
}

// Fake typing
function getUserName(user: User | undefined) {
	return user!!.name; // "Trust me compiler, I know what I'm doing"
}
```

This function expects a `User` object, but with good typing, we can also say that the input might actually be `undefined` as well.

The last method tells the compiler that the user input is never undefined, and therefore removing the need for handling the undefined case. The compiler also doesn't complain.

### Bad type declaration on functions

My last issue with typescript is the fact that declaring types on functions does not give us the expected behaviour.

In other typed languages, you can type functions as follows:

```typescript
function returnUser(user: User): User {
	return user;
}
```

The expected behaviour here is that the function will always return a `User` object. And if the programmer does not return an object of that type, the compiler should tell us. Well, this is not the case. Let's take a look at another example.

```typescript
// We declare a User that has a password, and a SafeUser which does not have a user
type User = {
	name: string;
	age: number;
	password: string;
};

type SafeUser = {
	name: string;
	age: number;
};

// Function that should return a user
function returnSafeUser(user: User): SafeUser {
	return user;
}
const user = {
	name: 'John Doe',
	age: 30,
	password: 'asdfgh'
};

const safeUser = returnSafeUser(user); // -> No complaints from compiler
```

This is not really a great representation of the types that are going on. The inferred type might be of `SafeUser`, but the object still has the attributes of a `User`.

TypeScript's type system is purely structural and exists only at compile time. It has no way to verify that your function actually implements what its signature claims. You can declare that a function transforms a User into a SafeUser, and as long as the return object has the required fields of SafeUser, TypeScript doesn't care what additional properties might still be lurking in there.

This is fundamentally different from languages like Rust, where the type system can actually guarantee that if you claim to return an `Option<T>`, you genuinely can't return `null`, the compiler enforces the contract at the language level. Rust's type system doesn't just trust your annotations; it verifies them.

TypeScript, on the other hand, is more like having really good documentation that gets erased at runtime. The types help during development, but there's no runtime enforcement of the contracts you've defined.
