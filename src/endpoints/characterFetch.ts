import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { Character } from "../types";
import characters from './json/characters.json'

export class CharacterFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Characters"],
		summary: "Get a single Character by name",
		parameters: {
			characterName: Path(String, {
				description: "Character name",
			}),
		},
		responses: {
			"200": {
				description: "Returns a single Character if found",
				schema: {
					success: Boolean,
					result: {
						character: Character,
					},
				},
			},
			"404": {
				description: "Character not found",
				schema: {
					success: Boolean,
					error: String,
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		const { characterName } = data.params;
		const searchedCharacter = characters.find(({name: searchedName}) => 
			characterName.toUpperCase() === searchedName.toUpperCase()
		)
		if (!searchedCharacter) {
			return Response.json(
				{
					success: false,
					error: "Character not found",
				},
				{
					status: 404,
				}
			);
		}
		return {
			success: true,
			character: searchedCharacter
		};
	}
}
