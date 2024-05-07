import { TeamSchema } from "lib/schemas"
import { local, prod } from "./tests.env.vars"

describe('Tests related to getters for fighters', async () => {
    it('Fetching the api with a limit of 5, should return a a valid of length 5', async () => {
        const response = await fetch( local + '/api/fighters?limit=5')
        const json = await response.json()
        const fighters = TeamSchema.safeParse((json as any)?.fighters)
       
        if(!fighters.success){
            console.log(fighters.error);
            return
        }

        return fighters.data.length === 5
    })
})