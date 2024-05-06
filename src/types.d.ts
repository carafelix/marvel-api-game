import { z } from 'zod'
import { Character, CharacterS, Sprite, Stats } from 'schemas'

export interface Env {
    MY_RATE_LIMITER: any
}
export type Character = z.TypeOf<typeof Character>;
export type CharacterS = z.TypeOf<typeof CharacterS>;
export type Sprite = z.TypeOf<typeof Sprite>;
export type Stats = z.TypeOf<typeof Stats>;