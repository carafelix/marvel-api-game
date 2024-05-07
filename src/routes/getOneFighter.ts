import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
    Path,
    Str,
} from "@cloudflare/itty-router-openapi";
import { CharStats, FighterSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}

export class getOneFighter extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Fighter"],
        summary: "Get a single Character by id",
        parameters: {
            id: Path(new Str(), {
                description: "ID of the desired character initiate as a fighter"
            }),
        },
        responses: {
            "200": {
                description: "Return a character with Actual Stamina",
                schema: {
                    success: Boolean,
                    result: {
                        fighter: FighterSchema,
                    },
                },
            },
            "489": {
                description: "Character ID was not found",
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
        const charactersCopy = characters.slice()
        
        const { id } = data.params
        const character = characters.find(({ id: charID }) => +id === +charID)

        if (!character) {
            return {
                success: false,
                error: 'Character not Found'
            }
        }

        const stamina = Math.floor(Math.random() * 10)
        const hp = getHP(character.stats, stamina)

        return {
            success: true,
            fighter: {
                character,
                stamina,
                hp
            },
        };
    }
}


function getHP(stats: CharStats, actualStamina: number): number {
    const base = ((stats.strength * 0.8) +
        (stats.durability * 0.8) +
        stats.power) / 2

    return Math.floor(base * (1 + (actualStamina / 10))) + 100
}