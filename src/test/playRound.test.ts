import { local, prod } from "./tests.env.vars"
import { RequestBody } from "@cloudflare/itty-router-openapi"
import fs from 'fs'
const data = JSON.stringify({
    "content": {
        "0": [
            {
                "id": 999,
                "name": "Ultron",
                "description": "Awesome character description",
                "thumbnail": "https://example.com/",
                "sprites": [
                    {
                        "title": "Sprite title",
                        "src": "https://example.com/"
                    }
                ],
                "stats": {
                    "intelligence": 5,
                    "strength": 5,
                    "speed": 5,
                    "durability": 5,
                    "power": 5,
                    "combat": 5
                },
                "type": "hero"
            }
        ],
        "1": [
            {
                "id": 999,
                "name": "Ultron",
                "description": "Awesome character description",
                "thumbnail": "https://example.com/",
                "sprites": [
                    {
                        "title": "Sprite title",
                        "src": "https://example.com/"
                    }
                ],
                "stats": {
                    "intelligence": 5,
                    "strength": 5,
                    "speed": 5,
                    "durability": 5,
                    "power": 5,
                    "combat": 5
                },
                "type": "hero"
            }
        ]
    }
})
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
    // })

    // it('Given proper input a round should be played and returns the new state of the game', async () => {
    //     const response = await fetch(local + '/api/fighters?limit=10')
    //     const json = await response.json()
    //     const fighters = TeamSchema.parse(fighters)

    //     const teamOne = fighters.slice(0, 5)
    //     const teamTwo = fighters.slice(5, 10)

    //     const postResponse = await fetch(local + '/api/game/playRound', {
    //         method: 'POST',
    //         body: JSON.stringify([teamOne,teamTwo])
    //     })
    // })
    it('Fetch', async () => {
        const response = await fetch(local + '/api/game/initField', {
            method: 'post',
            body: data
        } )
        const json = await response.json()
        console.log(json);


    })
})


