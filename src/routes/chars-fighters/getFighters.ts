import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema
} from "@cloudflare/itty-router-openapi";
import { Character, CharacterSchema, CharactersArrSchema, TeamsSchema, FightersArrSchema, bodyRequestTeamsTupleSchema, Fighter, FightersArr, CharactersArr } from "../../lib/schemas";
import characters from '../../lib/json/characters.json' assert {type: 'json'}
import { getRandomUniqueElementsFromArray } from "lib/getRandomsNoDuplicates";
import { getHP } from "../../lib/getHP";
import z from 'zod';

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
                description: "Characters where not even",
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
        const json = request.json()

        const chars = bodyRequestTeamsTupleSchema(CharactersArrSchema)
            .parse(json);
        const teamAChars = CharactersArrSchema.parse(chars[0])
        const teamBChars = CharactersArrSchema.parse(chars[1])

        
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


