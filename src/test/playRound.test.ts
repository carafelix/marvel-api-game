import { TeamSchema } from "lib/schemas"
import { local, prod } from "./tests.env.vars"
import { RequestBody } from "@cloudflare/itty-router-openapi"

describe('POST test to play a round', async () => {
    // it('Invalid body shape should should return an error status', async () => {
    //     const gameState = {
    //         shouldBeArray: NaN,
    //         thisIsInvalid: NaN
    //     }
    //     const response = await fetch( local + '/api/game/playRound', {
    //         method: 'POST',
    //         body: JSON.stringify(gameState)
    //     })
    //     const json = await response.json()
    // })
    // it('Invalid input team should return an error status', async () => {
    //     const response = await fetch( local + '/api/fighters?limit=5')
    //     const json = await response.json()
    // })
    
    // it('Given proper input a round should be played and returns the new state of the game', async () => {
    //     const response = await fetch(local + '/api/fighters?limit=10')
    //     const json = await response.json()
    //     const fighters = TeamSchema.parse((json as any)?.fighters)

    //     const teamOne = fighters.slice(0, 5)
    //     const teamTwo = fighters.slice(5, 10)
        
    //     const postResponse = await fetch(local + '/api/game/playRound', {
    //         method: 'POST',
    //         body: JSON.stringify([teamOne,teamTwo])
    //     })
    // })
})