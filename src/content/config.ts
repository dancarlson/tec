import { z, defineCollection, reference } from 'astro:content';
import theme from 'tailwindcss/defaultTheme';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const confCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),

    theme: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
    }),
  }),
});

// New location collection
const locationCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    // Add any other relevant fields for locations
  }),
});

// New organization collection
const organizationCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    website: z.string().url().optional(),
    // Add any other relevant fields for organizations
  }),
});

// New event collection
const eventCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),

    dates: z.object({
      start: z.date(),
      end: z.date(),
    }),
    altDateNote: z.string().optional(),
    conference: reference('conference').optional(),
    location: reference('location'),
    host: reference('organization'),
    sponsors: z.array(reference('organization')).optional(),
    prices: z.object({
      ngo: z.number(),
      guest: z.number(),
      city: z.number(),
    }),
    registrationLink: z.string().url(),
  }),
});

// Update the collections export
export const collections = {
  post: postCollection,
  conference: confCollection,
  event: eventCollection,
  location: locationCollection,
  organization: organizationCollection,
};
