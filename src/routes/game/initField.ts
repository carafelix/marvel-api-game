import {
    Arr,
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import z from 'zod'
import { bodyRequestTeamsTupleSchema, FieldStateSchema, FightersArrSchema } from "../../lib/schemas";

export class initField extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "returns a BattleField given two teams inside a tuple array-like object",
        requestBody: z.array(FightersArrSchema).min(2).max(2),
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
        data: DataOf<typeof initField.schema> & {
            body: z.TypeOf<ReturnType<typeof bodyRequestTeamsTupleSchema>>
        }
    ) {
        const v = await request.json()
        console.log(v)
        return {
            success: true,
        };
    }
}
