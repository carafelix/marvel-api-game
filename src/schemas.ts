import { z } from 'zod'

export const SpriteSchema = z.object({
  title: z.string(),
  src: z.string().url()
})

export const StatsSchema = z.object({
  intelligence: z.number().min(0).max(10),
  strength: z.number().min(0).max(10),
  speed: z.number().min(0).max(10),
  durability: z.number().min(0).max(10),
  power: z.number().min(0).max(10),
  combat: z.number().min(0).max(10),
})

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string().default('Ultron'),
  description: z.string(),
  thumbnail: z.string().url(),
  sprites: z.array(SpriteSchema),
  stats: z.object(StatsSchema.shape),
  type: z.enum(['hero', 'villain'])
})

export const CharactersSchema = z.array(CharacterSchema);

export type Character = z.TypeOf<typeof CharacterSchema>;
export type CharacterS = z.TypeOf<typeof CharacterSchema>;
export type Sprite = z.TypeOf<typeof SpriteSchema>;
export type Stats = z.TypeOf<typeof StatsSchema>;

