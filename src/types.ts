import { Arr, Obj } from "@cloudflare/itty-router-openapi";

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
  description: String,
  thumbnail: String,
  sprites: new Arr(Sprite),
  stats: new Obj(Stats),
  type: String
}



