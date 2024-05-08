import {
    Arr,
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import z from 'zod'
import { FieldStateSchema, FightersArrTupleSchema } from "../../lib/schemas";

export class initField extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "returns a BattleField given two teams inside a tuple",
        requestBody: FightersArrTupleSchema,
        responses: {
            "200": {
                description: "Returns the state of each team after they have battled against",
                schema: FieldStateSchema
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
            body: z.TypeOf<typeof FightersArrTupleSchema>
        }
    ) {
        return {
            teams: [data.body[0],data.body[1]],
            log: ['Lets the battle begin'],
            done: false,
            teamInTurn: 0,
            round: 0
          }
    }
}
