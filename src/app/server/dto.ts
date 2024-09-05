import { z } from 'zod';

export const TrackingEventDtoSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  objectType: z.string(),
  eventName: z.string(),
  description: z.string().optional(),
});

export type TrackingEventDto = z.infer<typeof TrackingEventDtoSchema>;

export function validateTrackingEventDto(
  body: unknown | object,
):
  | { data: TrackingEventDto; errors: [] }
  | { data: null; errors: { field: string; problem: string }[] } {
  const res = TrackingEventDtoSchema.safeParse(body);

  if (res.success) {
    return { data: res.data, errors: [] };
  }

  const errors = res.error.issues.map((issue) => ({
    problem: issue.message,
    field: issue.path.join('.'),
  }));
  return { data: null, errors };
}
