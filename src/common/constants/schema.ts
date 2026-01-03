import z from 'zod';

export const IdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
  }),
});

export const VideoIdParamSchema = z.object({
  params: z.object({
    videoId: z.string().regex(/^\d+$/, 'Video ID must be a numeric string'),
  }),
});
