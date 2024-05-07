import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    RequestBody,
} from "@cloudflare/itty-router-openapi";

import { BodyTeamsSchema, FieldStateSchema, FightersArrSchema } from "../../lib/schemas";

export class initField extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "returns a BattleField given a even array of proper fighters",
        requestBody: BodyTeamsSchema,
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
        data: DataOf<typeof initField.schema>
    ) {
        console.log(request.json())
        return {
            success: true,
        };
    }
}
