import * as v from 'valibot'

export const sectionSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Required')),
  status: v.union([v.literal('public'), v.literal('private')])
})
