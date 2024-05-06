import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { Character } from "../types";
import characters from './json/characters.json' assert {type: 'json'}

const MAX_RESULTS = 25
export class TaskList extends OpenAPIRoute {
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
				description: "Returns a list of characters",
				schema: {
					success: Boolean,
					result: {
						characters: [Character],
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
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const charactersCopy = characters.slice()
		let limit = data.query.limit
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

		const charactersResult = []
		while (limit) {
			const i = Math.floor(Math.random() * charactersCopy.length)
			charactersResult.push(...charactersCopy.splice(i, 1))
			--limit
		}

		return {
			success: true,
			characters: charactersResult,
		};
	}
}
