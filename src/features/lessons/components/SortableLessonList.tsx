'use client'

import { EyeClosed, Trash2Icon, VideoIcon } from 'lucide-react'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SortableList, SortableListItem } from '@/components/SortableList'
import { ActionButton } from '@/components/ActionButton'
import { LessonFormDialog } from '@/features/lessons/components/LessonFormDialog'
import { LessonStatus } from '@/drizzle/schema'
import { reorderLessons, deleteLesson } from '@/features/lessons/actions'
import { cn } from '@/lib/utils'

type SortableLessonListProps = {
  lessons: Array<{
    id: string
    name: string
    status: LessonStatus
    youtubeVideoId: string
    description: string | null
    sectionId: string
  }>
  sections: Array<{
    id: string
    name: string
  }>
}

export const SortableLessonList = ({
  lessons,
  sections
}: SortableLessonListProps) => {
  return (
    <SortableList items={lessons} onOrderChange={reorderLessons}>
      {(items) =>
        items.map((lesson) => (
          <SortableListItem
            key={lesson.id}
            id={lesson.id}
            className="flex items-center gap-1"
          >
            <div
              className={cn(
                'contents',
                lesson.status === 'private' && 'text-muted-foreground'
              )}
            >
              {lesson.status === 'private' && <EyeClosed className="size-4" />}
              {lesson.status === 'preview' && <VideoIcon className="size-4" />}
              {lesson.name}
            </div>
            <LessonFormDialog lesson={lesson} sections={sections}>
              <DialogTrigger asChild>
                <Button size="sm" className="ml-auto">
                  Edit
                </Button>
              </DialogTrigger>
            </LessonFormDialog>
            <ActionButton
              action={deleteLesson.bind(null, lesson.id)}
              confirm
              size="sm"
            >
              <Trash2Icon />
              <span className="sr-only">Delete</span>
            </ActionButton>
          </SortableListItem>
        ))
      }
    </SortableList>
  )
}
