import {
    Arr,
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import z from 'zod'
import { FieldStateSchema, TeamsSchema } from "../../lib/schemas";

export class initField extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "returns a BattleField given two teams inside a tuple",
        requestBody: TeamsSchema,
        responses: {
            "200": {
                description: "Returns the state of each team after they have battled against",
                schema: FieldStateSchema
            }
        },
    };
    async handle(
        request: Request,
        data: DataOf<typeof initField.schema> & {
            body: z.TypeOf<typeof TeamsSchema>
        }
    ) {
        return {
            teams: [data.body[0],data.body[1]],
            log: ['Lets the battle begin'],
            done: false,
            round: 0
          }
    }
}
