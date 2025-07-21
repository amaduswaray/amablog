---
title: 'Coding a Tech Blog and Coming to Peace with My Techstack'
description: 'Finally created a blog to share my thoughts, and Im no longer obessed with finding the best tech stack'
date: '2025-07-20'
image: '/post-images/coding-blog/thumbnail.jpg'
categories:
  - blog
  - tutorial
published: true
---

## Background; TLDR

Over the weekend, I decided to write my own Markdown blog, not because the world needs another one, but because it gives me an excuse to write and share my thoughts on different topics in tech.

Although creating a blog is fairly straightforward, I didn’t want to build anything until I had a framework I was actually content with. Unfortunately for me, a new framework gets released every day, each claiming to be better than the last. So, being the procrastinator I am, I would end up spending time learning new frameworks instead of building anything meaningful.

This, of course, resulted in never completing any of my projects. Breaking out of that "shiny new toy" cycle was tough, but I feel like I'm now in a place where I'm satisfied with the technology I'm using and how I'm building tools.

## How it started

My web dev journey began with React in 2022 after I completed my bachelor's degree. The projects I built during my degree were mostly abstract concepts or protocol implementations. Although I found those interesting, I also wanted to apply what I’d learned to build real applications.

React was the most popular framework at the time, so I decided to start there. I was already familiar with vanilla HTML, JS, and CSS, as well as setting up a web server and mounting markup by hand. That process was tedious, so when I discovered `npx create-react-app`, it opened a whole new world.

Like, what do you mean I can run a CLI command and have a web server running instantly? I could just start coding components and go from there.

```tsx
function HelloWorld() {
	return (
		<div>
			<p> Hello, World! </p>
		</div>
	);
}
```

Using React to create static sites might have been overkill, however, for some reason, this code would get me excited. No HTML boilerplate, just coding!

## Discovering other frameworks

That fall, I was in the process of trying to land a summer internship. I remember one of the interviewers explicitly recommending I learn Vue, because “React isn’t all that.” I took his advice and spent a couple of weeks rewriting my already unfinished projects in Vue.

I had some good experiences with Vue, but I couldn't get myself to really like it—mostly because it didn’t have the same hype as React.

Around that time, I also discovered other frameworks like Angular and SolidJS. My plan was to spend the holidays learning them—but something else came up.

## Advent of code 2022

During Advent of Code 2022, a couple of friends and I decided to challenge ourselves to solve the problems using as few lines of code as possible.

Our language of choice was Python, and we figured it would be a breeze.

As confident as we were, looking back at it, our solutions weren’t exactly groundbreaking.

**My solution**

```python
scores = {
    "A": {"X": 3, "Y": 4, "Z": 8},
    "B": {"X": 1, "Y": 5, "Z": 9},
    "C": {"X": 2, "Y": 6, "Z": 7}
}

total = 0
with open("inp.txt", "r") as file:
    for line in file:
        line = line.strip()
        opponent = line[0]
        player = line[2]
        total += scores[opponent][player]

print(total)

```

But then one of the seniors hit us with this one-liner:

```python
print(sum([{"A":{"X":3,"Y":4, "Z":8}, "B":{"X":1,"Y":5,"Z":9}, "C":{"X":2,"Y":6,"Z":7}}[x[0]][x[2]] for x in open("inp.txt", "r").readlines()]))

```

I was one of the few among my peers who hadn’t taken the functional programming course, so this blew my mind. It completely changed how I thought about programming.

Up to that point, I had been coding imperatively, like this:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []
for num in numbers:
    if num % 2 == 0:
        evens.append(num * 2)

```

This is usually how we're taught to code. But the declarative, functional style just clicked with me:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [num * 2 for num in numbers if num % 2 == 0]

```

Luckily for me, there’s a web framework based on a functional language: Phoenix LiveView, written in Elixir.

I started exploring it back in 2023 and decided to create a blog(that I never completed) to get more familiar with it.

```elixir

  defp filter_by_category(posts, "all"), do: posts # Returns all posts if the string "all is passed in as parameter"
  defp filter_by_category(posts, category) do # Actually filters
    Enum.filter(posts, fn
      %{category: ^category} -> true
      %{tags: tags} when is_list(tags) -> category in tags
      _ -> false
    end)
  end

```

I really enjoyed learning functional programming. This was some of the most satisfying code I’d ever written. Elixir’s pattern matching and multiple function clauses eliminate the need for traditional conditionals—you just define multiple versions of the same function for different cases.

And don’t get me started on Elixir’s one-liners. You’re not going to find many languages that let you parse Markdown to HTML this cleanly:

```elixir
"posts/*.md" |> Path.wildcard() |> Enum.map(&(File.read!(&1) |> String.split("---") |> then(fn [_, meta, content] -> {YamlElixir.read_from_string!(meta), MDEx.to_html!(content)} end))) |> Enum.map(fn {meta, html} -> File.write!("dist/#{meta["slug"]}.html", html) end)

```

This can all of course be formatted like this:

```elixir
"posts/*.md" # The |>(pipe) operator sends the output of the left-hand-side as input to function on the right-hand-side
|> Path.wildcard()
|> Enum.map(&(
  File.read!(&1)
  |> String.split("---")
  |> then(fn [_, meta, content] ->
    {YamlElixir.read_from_string!(meta), MDEx.to_html!(content)}
  end)
))
|> Enum.map(fn {meta, html} ->
  File.write!("dist/#{meta["slug"]}.html", html)
end)

```

Elixir had a lot going for it. My issue with Phoenix LiveView was that I only needed 10% of its features at the time. I didn’t appreciate how useful its full toolset was until much later.

## Creating Real products

When I started my master’s degree, I also did some freelancing. That’s when I realized I kept building the same things: auth, database, ORM, APIs.

Then I discovered Laravel, which was a “batteries-included” framework. This was exciting. What do you mean each project gets auth, payment, email, and layouts out of the box? 90% of the job was done for me. I could just focus on the part I actually cared about: implementing the product.

Funnily enough, Phoenix LiveView is also batteries-included, but Laravel was the new shiny toy at the time.

![laravel meme](/post-images/coding-blog/meme.jpg)

I took a liking to the MVC architecture, and it shaped the way I now think about web development. The good thing is that many modern frameworks are converging in that direction with SSR, remote functions, server-side routing, etc.

The second version of this blog was also created in Laravel, but I didn't complete that either.

Eventually, I stopped using Laravel. The context-switching between TypeScript in my day job and PHP in my free time became too much.

## What changed

If there’s one thing I’ve learned, it’s this: all these frameworks and tools ultimately solve the same problems.

So now, I’d rather just build with something I’m comfortable with, instead of constantly chasing the next trend.

I love learning new things, but when it comes to building, using the right tool for the job matters most. And if no specific tool is required, I’ll just use the most enjoyable.

## Selecting my tech stack

After I came to this realization, I started looking for my "endgame" stack.

At this point, I had React fatigue. I still liked Elixir for real-time apps, but I also wanted to stay in the JavaScript ecosystem.

My requirements were:

- A JS framework
- Lightweight, but capable of scaling in complexity
- Server + client in a single bundle
- Easy 0–100 workflow (build → deploy)

Unlike Laravel or Phoenix, JavaScript doesn’t have a batteries-included monolith. Instead, it has an ocean of libraries for each concern: auth, ORM, validation, etc. So I also had to pick libraries for those.

## How I went about it

One benefit of having such a large JavaScript community is that there are endless blog posts, forums, and surveys.

I found the [State of JS Libraries report](https://2024.stateofjs.com/en-US/libraries/) and used their tier list to guide my choices.

## The result

- **Authentication:** Better-auth — simple, secure, and supports all the OAuth providers I need.
- **ORM:** Drizzle — great TypeScript support, and I can drop to raw SQL when needed.
- **Database:** Turso — a fast, globally distributed SQLite solution with built-in scalability.

But the real game changer was SvelteKit.

Svelte’s approach with staying close to native HTML, CSS, and JS means there's barely a learning curve. You're just writing web code... but better. The stack feels “batteries-included” without the heavy abstraction or lock-in.

```svelte
<!-- Everything in one place -->

<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment} class="rounded bg-blue-500 px-4 py-2 text-white">
	Clicked {count} times
</button>
```

Components are just files:

```svelte
<!-- src/lib/Card.svelte -->
<script>
	let { title, content } = $props();
</script>

<div class="rounded bg-white p-6 shadow-lg">
	<h2 class="text-xl font-bold">{title}</h2>
	<p>{content}</p>
</div>
```

This Card component can be used as simple as this:

```svelte
<script>
	import Card from './Card.svelte';
</script>

<Card title="Hello" content="pew pew" />
```

If we create a `+layout.svelte` file, It will apply the layout to every `+page.svelte` file in the same folder, and its root folders

```shell
.
├── +layout.svelte <-- Applies layout to all children
├── +page.server.ts
├── +page.svelte
├── about
│   └── +page.svelte
└── blog
    ├── +page.server.ts
    ├── +page.svelte
    └── posts
        └── [slug]
            ├── +layout.server.ts
            ├── +layout.svelte
            ├── +page.svelte
            ├── +page.ts
            └── code-syntax-highlight.css

```

```svelte
<script>
	let { children }: LayoutProps = $props();
</script>

<nav class="bg-gray-900 p-4 text-white">
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

<main class="container mx-auto p-8">
	<!-- The page content renders here -->
	{@render children()}
</main>
```

With SvelteKit's upcoming remote functions bringing end-to-end type safety, I genuinely don’t see a reason to use anything else right now.

## Final Thoughts

After bouncing between frameworks, chasing trends, and rewriting the same projects in five different stacks, I’ve finally landed on a setup that just works for me.

I’m not claiming it’s perfect, or that I won’t get distracted by something new in a couple of months (Let’s be honest, I probably will). But now I’m focused on building things, not just exploring tools.

At the end of the day, the best stack is the one that gets out of your way and lets you create. And for the first time in a while, I feel like that’s exactly what I have.

Thanks for reading! I’m excited to kick off this blogging journey and see where it goes.
