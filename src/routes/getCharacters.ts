import {
	Arr,
	Num,
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { CharacterSchema, CharactersArrSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}

const MAX_RESULTS = characters.length

export class CharacterList extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Characters"],
		summary: "List Characters",
		parameters: {
			limit: Query(new Num().default(10), {
				description: "Number of results (Max 50)",
			}),
			offset: Query(new Num().default(0), {
				description: "Offset from which the list starts",
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of random characters",
				schema: new Arr(CharacterSchema)
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
		const { limit, offset } = data.query

		console.log(limit, offset)

		if (limit > MAX_RESULTS) {
			return Response.json(
				{
					success: false,
					error: "Limit greater than max results per request",
				},
				{
					status: 489,
				}
			)
		};
		
		const charactersResult = CharactersArrSchema.parse(characters).slice(offset, offset + limit)

		if (!charactersResult) {
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

		return charactersResult
	}
}
