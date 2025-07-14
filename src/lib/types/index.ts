import type { Component } from 'svelte';

export type MarkdownPost = {
	metadata: Post;
	default: Component;
};

export type Post = {
	title: string;
	description: string;
	slug: string;
	image?: string;
	date: string;
	categories: string[];
	published: boolean;
};
