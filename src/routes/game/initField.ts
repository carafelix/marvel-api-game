import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    RequestBody,
} from "@cloudflare/itty-router-openapi";

import { bodyRequestTeamsTupleSchema, FieldStateSchema, FightersArrSchema } from "../../lib/schemas";

export class initField extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "returns a BattleField given two teams inside a tuple array-like object",
        requestBody: bodyRequestTeamsTupleSchema(FightersArrSchema),
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
        const v = await request.json()
        console.log(v)
        return {
            success: true,
        };
    }
}
