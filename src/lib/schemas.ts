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

export const FighterSchema = z.object({
  character: CharacterSchema,
  stamina: z.number(),
  hp: z.number()
})

export const CharactersArrSchema = z.array(CharacterSchema)
export const TeamSchema = z.array(FighterSchema)
export const FieldSchema = z.array(TeamSchema)

export const FieldStateSchema = z.object({
  output: FieldSchema,
  log: z.array(z.string()),
  done: z.boolean()
})


export type CharactersArr = z.TypeOf<typeof CharactersArrSchema>;
export type Character = z.TypeOf<typeof CharacterSchema>;
export type CharacterS = z.TypeOf<typeof CharacterSchema>;
export type Sprite = z.TypeOf<typeof SpriteSchema>;
export type CharStats = z.TypeOf<typeof StatsSchema>;
