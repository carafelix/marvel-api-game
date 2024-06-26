import { ZodSchema } from 'zod'

/**
 * 
 * @param arr an array of elements from which we want to pick random elements
 * @param limit the amount of elements we want in the result's array, no duplicates
 * @param schema the schema that we want to validate against.
 * @returns @param array with elements picked from initial @param arr with no duplicates
 */

export function getRandomUniqueElementsFromArray<T>(arr: Array<any>, limit: number, schema: ZodSchema) {
    const copy = arr.slice()
    const result: T[] = []
    while (limit && copy.length) {
        const i = Math.floor(Math.random() * copy.length)
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