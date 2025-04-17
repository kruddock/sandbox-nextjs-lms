import * as v from 'valibot'

export const lessonSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Required')),
  sectionId: v.pipe(v.string(), v.nonEmpty('Required')),
  status: v.union([
    v.literal('public'),
    v.literal('private'),
    v.literal('preview')
  ]),
  youtubeVideoId: v.pipe(v.string(), v.nonEmpty('Required')),
  description: v.pipe(v.string(), v.nonEmpty('Required'))
  //   description: v.pipe(
  //     v.string(),
  //     v.transform((v) => (v === '' ? null : v))
  //   )
})
