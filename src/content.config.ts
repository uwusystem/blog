import { glob } from 'astro/loaders';
import { defineCollection, z, reference } from 'astro:content';

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		name: z.string(),
		bio: z.string().optional(),
		avatar: image().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		author: reference('authors'), // Add author reference
	}),
});

export const collections = { blog, authors };
