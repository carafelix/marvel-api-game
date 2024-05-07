import {
    OpenAPIRoute,
    OpenAPIRouteSchema, 
} from "@cloudflare/itty-router-openapi";
import { FieldSchema, FieldStateSchema } from "../lib/schemas";
import characters from '../lib/json/characters.json' assert {type: 'json'}

export class playRound extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Team"],
        summary: "Play a round given 2 teams of proper fighters",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: FieldSchema
                    }
                }
            }
        },

        responses: {
            "200": {
                description: "Returns the state of each team after they have battled against",
                schema: {
                    success: Boolean,
                    result: FieldStateSchema
                },
            },
            "489": {
                description: "Invalid Format",
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
