import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const entries = defineCollection({
  loader: glob({ pattern: "*/**.md", base: "./src/content" }),
  schema: z.object({
    company: z.string(),
    url: z.string().or(z.null()).optional(),
    role: z.string(),
    startdate: z.date(),
    enddate: z.date().or(z.null()).optional(),
  }),
});

export const collections = { entries };
