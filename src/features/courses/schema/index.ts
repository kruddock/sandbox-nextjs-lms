import * as v from 'valibot'

export const courseSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Required')),
  description: v.pipe(v.string(), v.nonEmpty('Required'))
})
