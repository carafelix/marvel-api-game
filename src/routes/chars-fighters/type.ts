export const bodyRequestTeamsTupleSchema =
  (ArrSchema: z.ZodType) => {
    return z.object({
        example: ArrSchema
    })
  }