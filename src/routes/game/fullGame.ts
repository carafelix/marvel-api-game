import {
    Arr,
    OpenAPIRoute,
    OpenAPIRouteSchema,
    Str,
} from "@cloudflare/itty-router-openapi";
import { Character, CharacterSchema, CharactersArrSchema, FighterSchema, FightersArrSchema } from "../../lib/schemas";
import { getRandomUniqueElementsFromArray } from "lib/getRandomsNoDuplicates";
import characters from '../../lib/json/characters.json'
import { getHP } from "lib/getHP";

export class FullGameFromScratch extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Game"],
        summary: "Play full game from scratch to end",
        responses: {
            "200": {
                description: "Play a full game and return its results",
                schema: {
                    success: Boolean,
                    initialTeams: {
                        teamA: new Arr(FighterSchema),
                        teamB: new Arr(FighterSchema),
                    },
                    log: new Arr(new Str()),
                    winner: new Str(),
                },
            }
        },
    };
    async handle() {
        const charactersResult = getRandomUniqueElementsFromArray<Character>(characters, 10, CharacterSchema)
        const parsedCharacters = CharactersArrSchema.parse(charactersResult)
        const fightersResult = parsedCharacters.map(character => {
            const stamina = Math.floor(Math.random() * 10)
            const hp = getHP(character.stats, stamina)

            return {
                character,
                stamina,
                hp,
            }
        })
        const fighters = FightersArrSchema.parse(fightersResult)

        const log: string[] = []
        const teamOne = fighters.slice(0, 5)
        const teamTwo = fighters.slice(5, 10)

        const InitialTeamOne = teamOne.slice()
        const InitialTeamTwo = teamTwo.slice()

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
            const rand = (n: number) => Math.floor(Math.random() * n);
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
            // log could be an array uh
            log.push(`In turn ${turnCount}, team ${teamInTurnName}:
        ${currFighter.character.name} attacked ${attackedEnemy.character.name}
        inflicting ${currAttack.toFixed(2)} damage!
        Leaving him with ${attackedEnemy.hp.toFixed(1)} HP!
        ${attackedEnemy.hp < 0 ? '\n ¡' + attackedEnemy.character.name + ' died!' : ''}`
            )
            turnCount++
        }
        const winner = teamOne.length ? 'team A' : 'team B'

        return {
            success: true,
            winner,
            initialTeams: {
                teamA: InitialTeamOne,
                teamB: InitialTeamTwo
            },
            log,
        }
    }
}