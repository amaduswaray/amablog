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

export type Project = {
	title: string;
	description: string;
	language: string;
	stars: number;
	url: string;
};
