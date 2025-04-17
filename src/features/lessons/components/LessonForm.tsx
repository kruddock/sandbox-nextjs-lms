'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { InferInput } from 'valibot'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RequiredFieldIndicator } from '@/components/RequiredFieldIndicator'
import { YouTubeVideoPlayer } from '@/features/lessons/components/YouTubeVideoPlayer'
import { LessonStatus, lessonStatuses } from '@/drizzle/schema'
import { lessonSchema } from '@/features/lessons/schema'
import { addLesson, updateLesson } from '@/features/lessons/actions'

type LessonFormProps = {
  sections: Array<{
    id: string
    name: string
  }>
  onComplete?: (evt: {
    error: boolean
    message: string
    entityId?: string
  }) => void
  defaultSectionId?: string
  lesson?: {
    id: string
    name: string
    status: LessonStatus
    youtubeVideoId: string
    description: string | null
    sectionId: string
  }
}

export const LessonForm = ({
  sections,
  defaultSectionId,
  onComplete,
  lesson
}: LessonFormProps) => {
  const form = useForm<InferInput<typeof lessonSchema>>({
    resolver: valibotResolver(lessonSchema),
    defaultValues: {
      name: lesson?.name ?? '',
      status: lesson?.status ?? 'public',
      youtubeVideoId: lesson?.youtubeVideoId ?? '',
      description: lesson?.description ?? '',
      sectionId: lesson?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? ''
    }
  })

  const onSubmit = async (data: InferInput<typeof lessonSchema>) => {
    const action =
      lesson == undefined ? addLesson : updateLesson.bind(null, lesson.id)

    const results = await action(data)

    onComplete?.(results)
  }

  const videoId = form.watch('youtubeVideoId')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col @container"
      >
        <div className="grid grid-cols-1 @lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredFieldIndicator />
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtubeVideoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredFieldIndicator />
                  YouTube Video Id
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sectionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lessonStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-20 resize-none"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
        {videoId && (
          <div className="aspect-video">
            <YouTubeVideoPlayer videoId={videoId} />
          </div>
        )}
      </form>
    </Form>
  )
}
