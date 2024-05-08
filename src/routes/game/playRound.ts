import {
    DataOf,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { FieldStateSchema, TeamsSchema } from "../../lib/schemas";
import z from 'zod'

export class playRound extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "Play a round given a proper BattleField",
        requestBody: FieldStateSchema,
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
        data: DataOf<typeof playRound.schema> & {
            body: z.TypeOf<typeof FieldStateSchema>
        }
    ) {
        const battlefield = data.body
        const teamOne = battlefield.teams[0]
        const teamTwo = battlefield.teams[1]

        const teamInTurn = battlefield.teams[battlefield.round % 2]
        const teamInTurnName = teamInTurn === teamOne ? 'A' : 'B'
        const oppositeTeam = teamInTurn === teamOne ? teamTwo : teamOne

        // pasted from fullGame, need to dry?

        const herosInTeam = teamInTurn.filter((fighter) => {
            fighter.character.type === 'hero'
        }).length
        
        const teamAlignment = herosInTeam > teamInTurn.length / 2 ? 'hero' :
            herosInTeam === teamInTurn.length / 2 ? 'neutral' : 'villain'

        // pick a character from team in turn
        const rand = (n: number) => Math.floor(Math.random() * n);
        const currFighter = teamInTurn[rand(teamInTurn.length)]
        const initialStats = {...currFighter.character.stats}
        console.log(currFighter.character.type)
        // should be a switch
        const FB = (
            teamAlignment === 'neutral' ?
                2 :
                currFighter.character.type === teamAlignment ?
                    2 + rand(10) :
                    (1 + rand(10)) ** -1
        )

        for (const stat in currFighter.character.stats) {
            const base = currFighter.character.stats[stat]
            currFighter.character.stats[stat] =
                (((2 * base) + currFighter.stamina) / 1.1) * FB
        }

        let { combat,
            durability,
            intelligence,
            power,
            speed,
            strength } = currFighter.character.stats

        const attacks = [
            (intelligence * 0.7 + speed * 0.2 + combat * 0.1) * FB,
            (strength * 0.6 + power * 0.2 + combat * 0.2) * FB,
            (speed * 0.7 + durability * 0.2 + strength * 0.1) * FB,
        ]
        const currAttack = attacks[rand(attacks.length)]
        const attackedEnemy = oppositeTeam.sort((a, b) => a.hp - b.hp)[0]
        attackedEnemy.hp -= currAttack

        if (attackedEnemy.hp < 0) {
            oppositeTeam.shift()
        }

        battlefield.log
            .push(`In turn ${battlefield.round}, team ${teamInTurnName}:
            ${currFighter.character.name} attacked ${attackedEnemy.character.name}
            inflicting ${currAttack.toFixed(2)} damage!
            Leaving him with ${attackedEnemy.hp.toFixed(1)} HP!
            ${attackedEnemy.hp < 0 ? '\n ¡' + attackedEnemy.character.name + ' died!' : ''}`
            )
        battlefield.round += 1

        if (!oppositeTeam.length) {
            battlefield.winner = teamInTurnName
            battlefield.done = true
            battlefield.log.push(`Victory for team: ${teamInTurnName}`)
        }
        currFighter.character.stats = initialStats

        return battlefield
    }
}
