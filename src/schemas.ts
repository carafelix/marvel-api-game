import { z } from 'zod'

export const Sprite = z.object({
  title: z.string(),
  src: z.string().url()
})

export const Stats = z.object({
  intelligence: z.number().min(0).max(10),
  strength: z.number().min(0).max(10),
  speed: z.number().min(0).max(10),
  durability: z.number().min(0).max(10),
  power: z.number().min(0).max(10),
  combat: z.number().min(0).max(10),
})

export const Character = z.object({
  id: z.number(),
  name: z.string().default('Ultron'),
  description: z.string(),
  thumbnail: z.string().url(),
  sprites: z.array(Sprite),
  stats: z.object(Stats.shape),
  type: z.enum(['hero', 'villain'])
})

export const CharacterS = z.array(Character);

