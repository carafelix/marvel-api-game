import { ZodArray, ZodTypeAny, ZodSchema } from 'zod'

/**
 * 
 * @param arr an array of elements from which we want to pick random elements
 * @param limit the amount of elements we want in the result's array, no duplicates
 * @param schema the schema that we want to validate against.
 * @returns 
 */

export function getRandomNoDuplicates<T>(arr: Array<any>, limit: number, schema: ZodSchema) {
    const copy = arr.slice()
    const result: T[] = []
    while (limit && copy.length) {
        const i = Math.floor(Math.random() * copy.length)
        console.log(copy[i])
        const current = schema.safeParse(copy.splice(i, 1)[0])
        if(!current.success){
            return false
        } else {
            result.push(current.data)
            --limit
        }
    }
    return result
}