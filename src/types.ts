import { Arr, Obj, Str } from "@cloudflare/itty-router-openapi";
export const Sprite = {
	title: String,
	src: String,
  }

export const Stats = {
  intelligence: Number,
  strength: Number,
  speed: Number,
  durability: Number,
  power: Number,
  combat: Number,
}

export const Character = {
  id: Number,
  name: new Str({example: 'Ultron'}),
  description: String,
  thumbnail: String,
  sprites: new Arr(Sprite),
  stats: new Obj(Stats),
  type: String
}

export interface Env {
  MY_RATE_LIMITER: any
}



