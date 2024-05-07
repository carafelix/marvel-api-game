import {
    Arr,
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { CharacterSchema, TeamSchema } from "../lib/schemas";

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
        const fighters = TeamSchema.parse(fightersJson)

        const log: string[] = []

        const teamOne = fighters.slice(0, 5)
        const teamTwo = fighters.slice(5, 10)
        let turnCount = 0;

        while (teamOne.length && teamTwo.length) {
            const teamInTurn = turnCount % 2 ? teamOne : teamTwo
            const oppositeTeam = teamInTurn === teamOne ? teamTwo : teamOne
            
            const teamInTurnName = teamInTurn === teamOne ? 'A' : 'B'

            const herosInTeam = teamInTurn.filter((fighter) => {
                fighter.character.type = 'hero'
            }).length
            const teamAlignment = herosInTeam > teamInTurn.length / 2 ? 'hero' :
                herosInTeam === teamInTurn.length / 2 ? 'neutral' : 'villain'

            // pick a character from team in turn
            const rand = (n) => Math.floor(Math.random() * n);
            const currFighter = teamInTurn[rand(teamInTurn.length)]

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

            log.push(
                `In turn ${turnCount}, team ${teamInTurnName}:
                ${currFighter.character.name} attacked ${attackedEnemy.character.name}
                inflicting ${currAttack.toFixed(2)} damage!${attackedEnemy.hp < 0 ? '\n ¡' + attackedEnemy.character.name + ' died!' : ''}`
            )
            turnCount++
        }
        const winner = teamOne.length ? 'team A' : 'team B'

        return {
            success: true,
            initialTeams: {
                teamOne,
                teamTwo
            },
            log,
            winner,
        }
    }
}