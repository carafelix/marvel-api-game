import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Character, CharactersArrSchema, Fighter, FightersArr, TeamsSchema } from "../../lib/schemas";
import z from 'zod';
import { getHP } from "lib/getHP";

export class getTeams extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "Get two teams of Fighters with HP and Stamina initialized",
        requestBody: CharactersArrSchema.min(2),
        responses: {
            "200": {
                description: "Return two teams of characters with Actual Stamina initialized",
                schema: TeamsSchema
            },
            "489": {
                description: "Teams length where not even",
                schema: {
                    success: Boolean,
                    error: String,
                },
            }
        },
    };
    async handle(
        request: Request,
        data: DataOf<typeof getTeams.schema> & {
            body: z.TypeOf<typeof CharactersArrSchema>
        }
    ) {
        const chars = data.body
        const teamAChars = chars.slice(0, chars.length / 2)
        const teamBChars = chars.slice(chars.length / 2)

        if(teamAChars.length !== teamBChars.length){
            return {
                success: false,
                error: 'Teams length was not even',
                status: 489
            }
        }

        const teamA : FightersArr = teamAChars.map((character : Character) : Fighter  => {
            const stamina = Math.floor(Math.random() * 10)
            const hp = getHP(character.stats, stamina)
            return {
                character,
                stamina,
                hp,
            }
        })
        const teamB : FightersArr = teamBChars.map((character : Character) : Fighter  => {
            const stamina = Math.floor(Math.random() * 10)
            const hp = getHP(character.stats, stamina)
            return {
                character,
                stamina,
                hp,
            }
        })
        return [
            teamA,
            teamB
        ]
    }
}


