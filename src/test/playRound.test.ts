import { CharactersArrSchema, FighterSchema, TeamSchema } from "lib/schemas"

describe('Should play a round given proper input', async () => {
    it('Fetch the api with a limit of 5', async () => {
        const response = await fetch('http://localhost:8787/api/fighters?limit=5')
        const json = await response.json()
        const fighters = TeamSchema.safeParse((json as any)?.fighters)

        if(!fighters.success){
            console.log(fighters.error);
            return
        }
        return fighters.data.length === 5
    })
})