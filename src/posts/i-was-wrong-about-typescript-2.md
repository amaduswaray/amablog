---
title: 'I was wrong about TypeScript: Part 2'
description: 'TypeScript is a quirky language, but it can be cool when applied correctly'
date: '2025-09-15'
image: '/post-images/wrong-about-typescript/thumbnail.jpg'
categories:
  - blog
  - tutorial
published: true
---

## TLDR

TypeScript is a peculiar language that is far from perfect, however, when spending some time to configure it, it's type system is actually quite good.

This is part two of a two-part article. This part shows why I came to like TypeScript more than before.

The first part can be read [here](/blog/posts/i-was-wrong-about-typescript-1).

## What changed my mind

Now that I've shown my issues with TypeScript, the question is what made me change my mind about it?

Well, there are two things primarily. During my uni years, while interviewing for summer internships, I would always ask interviewers what skills would help me hit the ground running after graduation. One interviewer mentioned TypeScript. I thought that I already knew TypeScript, however, he clarified that TypeScript is far more powerful than most developers realize. With its generics and advanced type features, you can build sophisticated abstractions that catch entire categories of bugs at compile time.

I will be honest, I didn't really understand what he meant at the time. Languages such as Rust has powerful type systems built in, and I didn't see how I could apply this in TypeScript. Additionally, I was being influenced by other developers who weren't too fond of TypeScript either.

Well this changed when getting a new job, and working under my current boss. He is quite the intellect, with a lot of experience in the industry, and has solved countless problems. The thing is, he is also a TypeScript advocate, and would do things with the language that I had never seen before. Things I didn't know was possible.

That's when I finally understood how to create a "Rust-like" experience with TypeScript. He introduced me to various developers and content creators in the TypeScript community who had built impressive tooling and abstractions that made the language significantly more powerful and enjoyable to work with.

Lets take a look at some of the code from [part 1](/blog/posts/i-was-wrong-about-typescript-1)

```TypeScript
function fetchData(): {
  try {
    const response = await fetch('https://api.example.com/data');
    const json = await response.json();
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
  }
}

```

The data fetching is contained within a specific scope, and we don't have access to the data outside of that scope. Additionally, the error handling requires you to jump back and forth between the try and catch blocks to understand the full flow. This can make the code quite unreadable.

If we introduce these types and functions from Theo T3, it can showcase how we can use generics to create good type-safety

```TypeScript

// We define a generic type success that always has to contain the data we are after.
type Success<T> = {
  data: T;
  error: null;
};

// We also define a generic type failure that always has to contain an error.
type Failure<E> = {
  data: null;
  error: E;
};


// Finally we define a result type that is either a success or a failure.
type Result<T, E = Error> = Success<T> | Failure<E>;


// Our function simply wraps our promise in a try catch block, and returns either a success or a failure.
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

```

Now we can rewrite our `fetchData` function like this:

```TypeScript

function fetchData(): {
  const {data, error} = await tryCatch(fetch('https://api.example.com/data'));
  // Data is possibly undefined here (before the error check)
  if (error) {
    // Handle the error here
    console.error(error);
    return;
  }
  // Data is guaranteed to be defined here
  return data;
}

```

This code is much more readable, and we have access to the data and error outside of the try catch block.

Additionally, we can explicitly infer the return type and the error type, but if our promise returns the specific type, TypeScript will infer it for us.

```TypeScript
  const {data, error} = await tryCatch<User, Error>(fetch('https://api.example.com/data'));
```

Now we know that data is of type `User`, and error is of type `Error`. We can also expand this by making specific error types.

This is just one example of how we can use TypeScript to create a better coding experience. There are many libraries and frameworks as well that expand the capabilities of TypeScript, such as input validation and better error handling.

## TypeScript Magic

There are of course many other ways we can make TypeScript way more enjoyable, so here are a couple of examples.

### The `keyof` operator

Beyond the Result pattern shown above, TypeScript offers several built-in utilities that showcase its type system's flexibility. The `keyof` operator extracts property names as a union of string literals, enabling type-safe property access. For instance, if you have a User type, `keyof User` gives you a union of all its property names, preventing typos and enabling powerful generic constraints

```TypeScript
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKeys = keyof User; // -> "id" | "name" | "email"

function getProperty(user: User, key: UserKeys) {
  return user[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
const userName = getProperty(user, "name");
const userId = getProperty(user, "id");

```

This means that using it as an input parameter gives us type-safety and auto-complete on the keys that actually exist, instead of allowing arbitrary strings.

### The `typeof` operator

The `typeof` operator works at the type level, allowing you to extract the type of a variable or expression. This is particularly useful when working with complex objects where you want to derive types from existing data structures rather than duplicating type definitions.

```TypeScript
const defaultConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type Config = typeof defaultConfig; // -> { apiUrl: string; timeout: number; retries: number }


```

### The `enums` and `union types`

TypeScript's enums provide a way to define named constants, though they come with some quirks. String enums are generally preferred over numeric ones since they're more debuggable and don't have the reverse mapping issues that numeric enums suffer from.

However, many developers now prefer union types over enums for better tree-shaking and simpler output.

```TypeScript
// String enum
enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed"
}

// Many prefer union types instead
type StatusUnion = "pending" | "completed" | "failed";

```

With string unions, we can combine it with the `keyof` operator, and another trick that makes auto-complete amazing.

Lets look at a simple example of logging error messages.

```TypeScript
// We define a set of default error messages
const DEFAULT_ERRORS = {
  VALIDATION_ERROR: "Invalid input provided",
  NETWORK_ERROR: "Network connection failed",
  AUTH_ERROR: "Authentication required",
  NOT_FOUND: "Resource not found"
};

// We can create the string union by using `keyof` operator
type ErrorType = keyof DEFAULT_ERRORS; // -> "VALIDATION_ERROR" | "NETWORK_ERROR" | "AUTH_ERROR" | "NOT_FOUND"

function handleError(error: ErrorType) {
  console.error(`Custom Error: ${DEFAULT_ERRORS[error]}`);
}

// Usage examples
handleError("VALIDATION_ERROR");           // ✅ Uses: "Invalid input provided"
handleError("AUTH_ERROR");                 // ✅ Uses: "Authentication required"
handleError("User uploaded invalid file"); // ❌ Custom message

```

In the code example, we'll get auto-complete on the default errors we we have defined, but what if we also want to create other error error messages? That's where the `{} & string` syntax comes in handy.

```TypeScript
// We can define a flexible error type as follows
type FlexibleError = ErrorType | (string & {});

// We update the handleError:
function handleError(error: FlexibleError) {
  // Return default error message if it exist, if not - return the error passed in
  console.error(`Custom Error: ${DEFAULT_ERRORS[error] || error}`);
}

// new usage
handleError("VALIDATION_ERROR");           // ✅ Uses: "Invalid input provided"
handleError("AUTH_ERROR");                 // ✅ Uses: "Authentication required"
handleError("User uploaded invalid file"); // ✅ Custom message
```

Now in addition to having auto-complete for default error messages, we can also define our own strings.

### Utility Classes

The real power comes from utility types like `Partial<T>`, `Required<T>`, `Pick<T, K>`, and `Omit<T, K>`. These let you transform existing types without redefining them entirely. Want to make all properties optional for a form update? `Partial<User>` does that instantly. Need only specific fields? `Pick<User, "id" | "name">` extracts just those properties.

There is a vast collection of utility types and classes that can be read [here](https://www.typescriptlang.org/docs/handbook/utility-types.html).

## `tsconfig.json`

Lastly we have the `tsconfig.json` file. Out of the box, TypeScript is pretty lenient, but once you start using those compiler flags, it becomes incredibly useful. Turn on `strict: true` and `noImplicitAny`, and suddenly TypeScript stops letting you get away with sloppy typing. Add `noUncheckedIndexedAccess` and it'll even catch unsafe array access.

## Conclusion

The conclusion is essentially that TypeScript is quite the joke if you look at it in a surface level. However, if you take the time to configure it properly, and learn how to use its advanced types and generics, you can create a quite powerful and enjoyable coding experience.

There are of course still other problems that come with TypeScript and JavaScript, but it may not be as bad as I initially thought.
