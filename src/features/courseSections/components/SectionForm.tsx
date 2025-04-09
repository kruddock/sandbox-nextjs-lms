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
import { Button } from '@/components/ui/button'
import { CourseSectionStatus, courseSectionStatuses } from '@/drizzle/schema'
import { sectionSchema } from '../schema'
import { toast } from 'sonner'
import { addSection, updateSection } from '../actions'
import { RequiredFieldIndicator } from '@/components/RequiredFieldIndicator'

type SectionFormProps = {
  section?: {
    id: string
    name: string
    status: CourseSectionStatus
  }
  courseId: string
  onSuccess?: () => void
}

export const SectionForm = ({
  section,
  courseId,
  onSuccess
}: SectionFormProps) => {
  const form = useForm<InferInput<typeof sectionSchema>>({
    resolver: valibotResolver(sectionSchema),
    defaultValues: section ?? {
      name: '',
      status: 'public'
    }
  })

  const onSubmit = async (data: InferInput<typeof sectionSchema>) => {
    const action =
      section === undefined
        ? addSection.bind(null, courseId)
        : updateSection.bind(null, section.id)
    const { error, message } = await action(data)

    if (error) {
      toast.error(message)
      return
    }

    toast.success(message)
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredFieldIndicator />
                  <span>Name</span>
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
                    {courseSectionStatuses.map((status) => (
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

          <div className="text-right">
            <Button disabled={form.formState.isSubmitting} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
