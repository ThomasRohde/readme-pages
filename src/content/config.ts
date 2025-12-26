import { defineCollection, z } from 'astro:content';
// import { notesLoader, pagesLoader } from '../loaders/content-loaders';

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
  type: 'content',
  schema: z.object({
    title: titleSchema,
    description: descriptionSchema,
    order: z.number().int().min(0).optional(),
  }),
});

// Notes collection: dated entries
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: titleSchema,
    description: descriptionSchema,
    date: dateSchema,
    tags: z.array(tagSchema).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

// Recipes collection: cooking recipes with structured metadata
const recipes = defineCollection({
  type: 'content',
  schema: z.object({
    title: titleSchema,
    description: descriptionSchema,
    date: dateSchema,
    tags: z.array(tagSchema).optional().default([]),
    draft: z.boolean().optional().default(false),
    // Recipe-specific fields
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    servings: z.number().int().min(1).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  }),
});

// Exclude Templates directory by adding glob pattern
export const collections = {
  pages,
  notes,
  recipes,
};
