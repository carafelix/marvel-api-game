import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Character, CharacterS, CharacterSchema, CharactersSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}
import { getRandomNoDuplicates } from "lib/getRandomsNoDuplicates";

const MAX_RESULTS = 25
export class CharacterList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Characters"],
		summary: "List Characters",
		parameters: {
			limit: Query(Number, {
				description: "Number of results (Max 25)",
				default: 10,
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of random characters",
				schema: {
					success: Boolean,
					result: {
						characters: [CharacterSchema],
					},
				},
			},
			"489": {
				description: "Requested Characters exceeded the Maximum ",
				schema: {
					success: Boolean,
					error: String,
				},
			}
		},
	};
	async handle(
		request: Request,
		data: Record<string, any>
	) {
		const { limit } = data.query

		if (limit > MAX_RESULTS) {
			return Response.json(
				{
					success: false,
					error: "Limit greater than max results per request (25)",
				},
				{
					status: 489,
				}
			)
		};

		const charactersResult = getRandomNoDuplicates<Character>(characters, limit, CharacterSchema)

		if(!charactersResult || !charactersResult.length){
			return Response.json(
				{
					success: false,
					error: "Character result returned empty.",
				},
				{
					status: 489,
				}
			)
		}

		return {
			success: true,
			characters: charactersResult,
		};
	}
}
