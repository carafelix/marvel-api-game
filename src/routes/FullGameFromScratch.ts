import {
    Arr,
    Num,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    Query,
} from "@cloudflare/itty-router-openapi";
import { CharStats, Character, CharacterSchema, FighterSchema, TeamSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}
import { getRandomUniqueElementsFromArray } from "lib/getRandomsNoDuplicates";

export class FullGameFromScratch extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "getFighters",
        responses: {
            "200": {
                description: "Play a full game and return its results",
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
        const self = new URL(request.url)
        const fightersJson = await (await fetch(self.origin + '/api/fighters' + '?limit=10')).json()
        console.log(fightersJson)
        const fighters = TeamSchema.parse(fightersJson)
        
        // console.log(fighters)
        
        return {
            success: true,
        }
    }
}