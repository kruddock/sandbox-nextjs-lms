'use client'

import { EyeClosed, Trash2Icon } from 'lucide-react'
import { CourseSectionStatus } from '@/drizzle/schema'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SortableItem, SortableList } from '@/components/SortableList'
import { ActionButton } from '@/components/ActionButton'
import { SectionFormDialog } from '@/features/courseSections/components/SectionFormDialog'
import {
  updateSectionOrders,
  deleteSection
} from '@/features/courseSections/actions'
import { cn } from '@/lib/utils'

type SortableSectionListProps = {
  courseId: string
  sections: Array<{
    id: string
    name: string
    status: CourseSectionStatus
  }>
}

export const SortableSectionList = ({
  courseId,
  sections
}: SortableSectionListProps) => {
  return (
    <SortableList items={sections} onOrderChange={updateSectionOrders}>
      {(items) =>
        items.map((section) => (
          <SortableItem
            key={section.id}
            id={section.id}
            className="flex items-center gap-1"
          >
            <div
              className={cn(
                'contents',
                section.status === 'private' && 'text-muted-foreground'
              )}
            >
              {section.status === 'private' && <EyeClosed className="size-4" />}
              {section.name}
            </div>

            <SectionFormDialog section={section} courseId={courseId}>
              <DialogTrigger asChild>
                <Button size="sm" className="ml-auto">
                  Edit
                </Button>
              </DialogTrigger>
            </SectionFormDialog>

            <ActionButton confirm action={deleteSection.bind(null, section.id)}>
              <Trash2Icon />
              <span className="sr-only">Delete</span>
            </ActionButton>
          </SortableItem>
        ))
      }
    </SortableList>
  )
}
