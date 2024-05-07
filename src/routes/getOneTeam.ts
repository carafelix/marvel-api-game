import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { FighterSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}

export class getOneTeam extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Team"],
        summary: "getOneTeam",
        parameters: {
            // id: (z.array(FighterSchema), {
            //     description: "ID's array of the desired team members"
            // }), 
            // MISSING IMPLEMENTATION
        },
        responses: {
            "200": {
                description: "Returns a team of five member with their stats modified according to the team alignment",
                schema: {
                    success: Boolean,
                    result: {
                        fighter: [FighterSchema],
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

        const { id } = data.query
        const character = characters.find(({ id: charID }) => id === charID)
        
        if (!character) {
            return {
                success: false,
                error: 'Character not Found'
            }
        }

        const stamina = Math.floor(Math.random() * 10)

        return {
            success: true,
            fighter: {
                id,
                stamina,
            },
        };
    }
}
