import * as v from 'valibot'

export const productSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Required')),
  priceInDollars: v.pipe(v.number()),
  description: v.pipe(v.string(), v.nonEmpty('Required')),
  imageUrl: v.pipe(v.string(), v.nonEmpty('Required'), v.url()),
  status: v.union([v.literal('public'), v.literal('private')]),
  courseIds: v.pipe(
    v.array(v.string()),
    v.minLength(1, 'At least one course is required')
  )
})
