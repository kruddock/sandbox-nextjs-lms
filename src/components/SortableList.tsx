'use client'

import { GripVerticalIcon } from 'lucide-react'
import { ReactNode, useId, useOptimistic, useTransition } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type SortableListProps<T> = {
  items: Array<T>
  onOrderChange: (newOrder: string[]) => Promise<{
    error: boolean
    message: string
  }>
  children: (items: Array<T>) => ReactNode
}

type SortableItemProps = {
  id: string
  children: ReactNode
  className?: string
}

export const SortableList = <T extends { id: string }>({
  items,
  onOrderChange,
  children
}: SortableListProps<T>) => {
  const dndContextId = useId()
  const [optimisticItems, setOptimisticItems] = useOptimistic(items)
  const [_, startTransition] = useTransition()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeId = active.id.toString()
    const overId = over?.id.toString()
    if (overId == null || activeId == null) return

    function getNewArray(array: T[], activeId: string, overId: string) {
      const oldIndex = array.findIndex((section) => section.id === activeId)
      const newIndex = array.findIndex((section) => section.id === overId)
      return arrayMove(array, oldIndex, newIndex)
    }

    startTransition(async () => {
      setOptimisticItems((items) => getNewArray(items, activeId, overId))
      const { error, message } = await onOrderChange(
        getNewArray(optimisticItems, activeId, overId).map((s) => s.id)
      )

      if (error) {
        toast.error(message)

        return
      }

      toast.success(message)
    })
  }

  return (
    <DndContext id={dndContextId} onDragEnd={handleDragEnd}>
      <SortableContext
        items={optimisticItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col">{children(optimisticItems)}</div>
      </SortableContext>
    </DndContext>
  )
}

export const SortableItem = ({
  id,
  children,
  className
}: SortableItemProps) => {
  const {
    setNodeRef,
    transform,
    transition,
    activeIndex,
    index,
    attributes,
    listeners
  } = useSortable({ id })
  const isActive = activeIndex === index
  const cssMain = 'p-2 bg-background rounded-lg flex gap-1 items-center'

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(cssMain, isActive && 'z-10 border shadow-md')}
    >
      <GripVerticalIcon
        className="size-6 p-1 text-muted-foreground"
        {...attributes}
        {...listeners}
      />
      <div className={cn('flex-grow', className)}>{children}</div>
    </div>
  )
}
