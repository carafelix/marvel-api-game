import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";

import { BodySchema, FieldSchema, FieldStateSchema } from "../../lib/schemas";

export class playRound extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "Play a round given 2 teams of proper fighters",
        request: {
            // body: BodySchema
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
    ) {
        const json = await request.json()
        
        console.log(json)

        return {
            success: true,
        };
    }
}
