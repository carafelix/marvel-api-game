import { Arr } from "@cloudflare/itty-router-openapi";

export const Sprite = {
	title: String,
	src: String,
  }

export const Character = {
  id: Number,
  description: String,
  thumbnail: String,
  sprites: new Arr(Sprite),
}
