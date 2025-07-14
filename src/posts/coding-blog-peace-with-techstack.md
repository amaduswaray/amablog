---
title: 'Coding a Tech Blog and Coming to Peace with My Techstack'
description: 'Finally created a blog to share my thoughts, and Im no longer obessed with finding the best tech stack'
date: '2025-07-17'
image: '/post-images/coding-blog/thumbnail.jpg'
categories:
  - blog
  - tutorial
published: true
---

## Background; TLDR

Over the weekend, I decided to write my own Markdown blog — not because the world needs another one, but because I it gives me an excuse to write and share my thoughts on different topics in tech.

Although creating a blog is quite straight forward, I didn't want to create something until I had a framework I was was content with. Unfortunately for me, there's a new framework that gets released everyday, and every single one claims to better than the other. Being the procastinator I aim, I would buy in to the hype and try out all the new frameworks.

This of course resulted in spending time learning these new frameworks, instead of actually building and finishing my projects. Breaking out of that "shiny new toy" bubble was tough, but I feel like I'm now in a place where I'm quite satisfied with the technology I'm using, and how I'm building tools.

## How it started

My web journey started with React back in 2022 after I completed my bachelor. During my degree, I would mostly write systems level programs(like network protocols), or implement abstract algorithms(like a tries). Although I found this interesting, I wanted to get into applied software engineering and actually create real products.

React would be my framework of choice, as it was the most popular. I was familiar with vanilla HTML, JS and CSS, and setting up all the web things from scratch was quite tedious. However, discovering `npx create-react-app my-app` opened a whole new world.

Like, what do you mean I can write a CLI command hand have a web-server running?

I could just start a project, code my components and be on my way.(I did indeed suse react for static websites)

```tsx
function loading() {
	return (
		<Box>
			<CircularProgress></CircularProgress>
		</Box>
	);
}
```

However! For some reason, this code would get me excited. No HTML boilerplate, just coding!

## Discovering other frameworks

During fall that same year, I was the process of trying to get a summer internship, and I remember one of my interviewers mentioned explicitly that I should learn VUE, because React wasn't "all that". I took his advice at that time, and spent the next couple of weeks rewriting my already unfinished projects in Vue. I had some good experiences with Vue, but I couldn't get myself to really like it. Mostly because it didn't have the same hype as React.

But during that time I also discovered other frameworks such as angular and solid. My plan was to spend the holidays learning those frameworks, however something came up.

## Advent of code 2022.

This years advent of code, a couple of friends and I decided to see who could solve the challenges in the fewest lines possible.

The language of choice at the time was Python, and we were all confident in our solutions.

**My solution**

```Python
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

However, one of the seniors hit us with this one-liner:

```Python
print(sum([{"A":{"X":3,"Y":4, "Z":8}, "B":{"X":1,"Y":5,"Z":9}, "C":{"X":2,"Y":6,"Z":7}}[x[0]][x[2]] for x in open("inp.txt", "r").readlines()]))

```

I think this is one of the top five most humbling experiences in my life. This senior really replicated all of my logic a single line of code.

The syntax looked so unrecognizable, and it was nothing like the python i was used to. I wanted to be able to flex like he did, so that was when I disovered the world of functional programming, and went down that rabbit hole. And with that came Elixir and Phoenix Liveview

```Elixir

  defp filter_by_category(posts, "all"), do: posts # Returns all posts if the string "all is passed in as parameter"
  defp filter_by_category(posts, category) do # Actually filters
    Enum.filter(posts, fn
      %{category: ^category} -> true
      %{tags: tags} when is_list(tags) -> category in tags
      _ -> false
    end)
  end

```

I had a good time learning functional programming, and this was some of the most enjoyable code I've written. Elixir's pattern matching and multiple function clauses eliminate the need for conditional logic - instead of nested if statements, you define multiple versions of the same function that each handle a specific case.

And we can't forget the one liner functions. I don't think there are many other languages where you can parse markdown to html like this:

```Elixir
"posts/*.md" |> Path.wildcard() |> Enum.map(&(File.read!(&1) |> String.split("---") |> then(fn [_, meta, content] -> {YamlElixir.read_from_string!(meta), MDEx.to_html!(content)} end))) |> Enum.map(fn {meta, html} -> File.write!("dist/#{meta["slug"]}.html", html) end)

```

This could all of course can be formatted like this:

```Elixir
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

Elixir had a lot of things going for it. The issue I had was with Phoenix Liveview and the fact that I only needed 10% of what it offered. I didn't appreciate all the tools it offered until later.

## Creating Real products

When I started my Masters, I took on some jobs as a free lance software engineer. During this time, I realised that I would build a lot of the same things over and over again. Rolling out auth, setting up a database and ORM, and the APIs. React would be my tool for this. I was aware that the pool of frameworks and libraries in React has vast, but I never decided to just stick to one. I would always rebuild things over and over.

One day I stumbled upon Laravel, and the concept of "batteries included" frameworks. Now this was exciting. What do you mean in each program i get Auth, payment, email, as well as layouts included! 90% of my job was essentially done. With this i could just focus on the one thing i wanted; actually implementing my program.

Funnily enough, Phoenix Liveview also provided the same things as laravel, but this time Laravel was the new shiny toy I wanted to play with

I really took a liking to the MVC archicecture, and it has kind of shaped the way I think of web developement now. A good thing is that many web frameworks seem to be going in the same direction with SSR, and remote functions.

However I decided to quit Laravel because there was no need to be niche.(Because no one really codes in PHP)

## What changed

If there is one thing I've learned now, it's that all these fancy tools and frameworks essentially solve the same thing. And It's more important to have a tool you're comfortable with, than to just hop on the new trend.

I love to learn new things, but when it comes to creating things, using the right tool for the job is the most important. And if a job doesnt require a specific tool, i could just select my favourite.

## Selecting my tech stack

After I came to this realization, I wanted to find my "endgame" stacks. At this stage, I had fatigue from react. I would still use Elixir if the project was something real time. However, I wanted to stay withing the javascript realm because we know that it's not going anywhere.

So now my requirements were:

- A JS framework
- Something that is lightweight but still has the ability to create complexity
- Server and client in a single bundle
- Easy 0-100 when it came to building and deploying

The tool i ended up with was Sveltekit. The `.svelte` files and its markup is quite straight forward, allowing me to do the templating and scripting and styling in the same file. With tailwind, it becomes a breeze to create components.

Every `.svelte` file is also a component, allowing you to import and re-use it wherever in the project

The `.server.ts` files could let me handle all the backend logic i needed. And with sveltekit remote functions on the way, it creates a way for me to have end to end typesafety with the client and server.

If i wanted a layout for my page, I could create a `+layout.svelte` file in the same route as my component. Every sub route would also adopt this layout.

Other libraries like better-auth also allows me to roll out auth easily. With the drizzle ORM, and SQLite or a postgres server lets me boot up a fully fledged full stack application in minutes. And with sveltekit's ease of use, i can truly focus on what matters; the coding
