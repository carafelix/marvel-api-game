import { RequestBody } from '@cloudflare/itty-router-openapi'
import { z } from 'zod'

export const SpriteSchema = z.object({
  title: z.string().default('Sprite title'),
  src: z.string().url()
})

export const StatsSchema = z.object({
  intelligence: z.number().min(0).max(10).default(5),
  strength: z.number().min(0).max(10).default(5),
  speed: z.number().min(0).max(10).default(5),
  durability: z.number().min(0).max(10).default(5),
  power: z.number().min(0).max(10).default(5),
  combat: z.number().min(0).max(10).default(5),
})

export const CharacterSchema = z.object({
  id: z.number().default(999),
  name: z.string().default('Ultron'),
  description: z.string().default('Awesome character description'),
  thumbnail: z.string().url(),
  sprites: z.array(SpriteSchema),
  stats: z.object(StatsSchema.shape),
  type: z.enum(['hero', 'villain'])
})
export const CharactersArrSchema = z.array(CharacterSchema)

export const FighterSchema = z.object({
  character: CharacterSchema,
  stamina: z.number().default(5),
  hp: z.number().default(100),
})

export const FightersArrSchema = z.array(FighterSchema)

export const bodyRequestTeamsTupleSchema =
  (ArrSchema: typeof CharactersArrSchema |
    typeof FightersArrSchema
  ) => {
    return z.object({
      0: ArrSchema,
      1: ArrSchema
    })
  }

export const TeamsSchema = z.object({
  0: FightersArrSchema,
  1: FightersArrSchema
})

export const FieldStateSchema = z.object({
  output: TeamsSchema,
  log: z.array(z.string()),
  done: z.boolean(),
  teamInTurn: z.boolean(),
  round: z.number().min(0).default(0)
})

export type CharactersArr = z.TypeOf<typeof CharactersArrSchema>;
export type Character = z.TypeOf<typeof CharacterSchema>;
export type Fighter = z.TypeOf<typeof FighterSchema>;
export type FightersArr = z.TypeOf<typeof FightersArrSchema>;
export type Sprite = z.TypeOf<typeof SpriteSchema>;
export type CharStats = z.TypeOf<typeof StatsSchema>;

