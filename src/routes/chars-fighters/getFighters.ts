import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Character, CharactersArr, CharactersArrSchema, Fighter, FightersArr, TeamsSchema, bodyRequestTeamsTupleSchema } from "../../lib/schemas";
import z from 'zod';
import { getHP } from "lib/getHP";

export class getFighters extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Fighter"],
        summary: "Get two teams of Fighters with HP and Stamina initialized",
        requestBody: bodyRequestTeamsTupleSchema(CharactersArrSchema),
        responses: {
            "200": {
                description: "Return a list of characters with Actual Stamina initialized",
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
        data: DataOf<typeof getFighters.schema> & {
            body: z.TypeOf<ReturnType<typeof bodyRequestTeamsTupleSchema>>
        }
    ) {
        const teamAChars = CharactersArrSchema.parse(data.body[0])
        const teamBChars = CharactersArrSchema.parse(data.body[1])

        if(teamAChars.length !== teamBChars.length){
            return {
                success: false,
                error: 'Teams length was not even'
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
        return {
            0: teamA,
            1: teamB
        }
    }
}


