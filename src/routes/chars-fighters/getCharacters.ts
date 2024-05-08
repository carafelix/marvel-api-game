import {
	Arr,
	Bool,
	DataOf,
	Num,
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Query,
} from "@cloudflare/itty-router-openapi";
import { Character, CharacterSchema, CharactersArrSchema } from "../../lib/schemas";
import characters from '../../lib/json/characters.json' assert {type: 'json'}
import { getRandomUniqueElementsFromArray } from "lib/getRandomsNoDuplicates";

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
			random: Query(new Bool().default(false), {
				description: "Get random characters from the whole pool instead",
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of alphabetically order characters",
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
		data: DataOf<typeof CharacterList.schema>
	) {
		const { limit, offset, random } = data.query

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
		
		let charactersResult = CharactersArrSchema.parse(characters).slice(offset, offset + limit)

		if(random){
			const chars = getRandomUniqueElementsFromArray<Character>(characters,limit,CharacterSchema)
			if(!chars){
				return 
			};
			charactersResult = chars
		}

		if (!charactersResult) {
			return {
				success: false,
				error: "Character result returned empty.",
				status: 489
			}
		}

		return charactersResult
	}
}
