import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { z } from "zod";
import { Character } from "../schemas";
import characters from './json/characters.json'

export class CharacterFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Characters"],
		summary: "Get a single Character by name",
		parameters: {
			characterName: Path(z.string(), {
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
		data: Record<string, any>
	) {

		const { characterName } = await data.params;
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
