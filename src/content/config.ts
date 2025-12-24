import { defineCollection, z } from 'astro:content';
import { notesLoader, pagesLoader } from '../loaders/content-loaders';

// Reusable schema components
const titleSchema = z
  .string()
  .min(1, 'Title cannot be empty')
  .max(200, 'Title must be less than 200 characters')
  .refine((val) => val.trim().length > 0, {
    message: 'Title cannot be only whitespace',
  });

const descriptionSchema = z
  .string()
  .max(500, 'Description must be less than 500 characters')
  .optional();

const tagSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, {
    message: 'Tags must be lowercase alphanumeric with hyphens only',
  })
  .min(1, 'Tag cannot be empty')
  .max(50, 'Tag must be less than 50 characters');

const dateSchema = z.coerce
  .date()
  .refine((date) => date <= new Date(), {
    message: 'Date cannot be in the future',
  })
  .refine((date) => date >= new Date('2000-01-01'), {
    message: 'Date must be after 2000-01-01',
  });

// Pages collection: evergreen documentation
const pages = defineCollection({
  loader: pagesLoader({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: titleSchema,
    description: descriptionSchema,
    order: z.number().int().min(0).optional(),
  }),
});

// Notes collection: dated entries
const notes = defineCollection({
  loader: notesLoader({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: titleSchema,
    description: descriptionSchema,
    date: dateSchema,
    tags: z.array(tagSchema).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  pages,
  notes,
};
