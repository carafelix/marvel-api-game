import {
    Arr,
    DataOf,
    Num,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    Query,
} from "@cloudflare/itty-router-openapi";
import { Character, CharacterSchema, FighterSchema } from "../../lib/schemas";
import characters from '../../lib/json/characters.json' assert {type: 'json'}
import { getRandomUniqueElementsFromArray } from "lib/getRandomsNoDuplicates";
import { getHP } from "../../lib/getHP";

export class getFighters extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Fighter"],
        summary: "Get a list of Fighters with HP and Stamina initialized",
        parameters: {
            limit: Query(new Num().default(10), {
                description: "Amount of characters desired to initiate as a fighters (max 25)"
            }),
        },
        responses: {
            "200": {
                description: "Return a list of characters with Actual Stamina initialized",
                schema: new Arr(FighterSchema)
            },
            "489": {
                description: "Limit exceeded max",
                schema: {
                    success: Boolean,
                    error: String,
                },
            }
        },
    };
    async handle(
        request: Request,
        data: DataOf<typeof getFighters.schema>
    ) {
        const { limit } = data.query

        const charactersResult = getRandomUniqueElementsFromArray<Character>(characters, limit, CharacterSchema)

        if (!charactersResult || !charactersResult.length) {
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

        const fighters = charactersResult.map(character => {
            const stamina = Math.floor(Math.random() * 10)
            const hp = getHP(character.stats, stamina)

            return {
                character,
                stamina,
                hp,
            }
        })

        return fighters
    }
}


