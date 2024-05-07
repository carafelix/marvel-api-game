import {
    Arr,
    Num,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    Query,
} from "@cloudflare/itty-router-openapi";
import { CharStats, Character, CharacterSchema, FighterSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}
import { getRandomNoDuplicates } from "lib/getRandomsNoDuplicates";

export class getFighters extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Fighter"],
        summary: "getFighters",
        parameters: {
            limit: Query(new Num().default(10), {
                description: "Amount of characters desired to initiate as a fighters (max 25)"
            }),
        },
        responses: {
            "200": {
                description: "Return a list of characters with Actual Stamina initialized",
                schema: {
                    success: Boolean,
                    result: {
                        fighters: new Arr(CharacterSchema),
                    },
                },
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
        data: Record<string, any>
    ) {
        const { limit } = data.query
        
        const charactersResult = getRandomNoDuplicates<Character>(characters, limit, CharacterSchema)
        
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

        return {
            success: true,
            fighters,
        }
    }
}


function getHP(stats: CharStats, actualStamina: number): number {
    const base = ((stats.strength * 0.8) +
        (stats.durability * 0.8) +
        stats.power) / 2

    return Math.floor(base * (1 + (actualStamina / 10))) + 100
}