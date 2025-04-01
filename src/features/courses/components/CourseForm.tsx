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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { RequiredFieldIndicator } from '@/components/RequiredFieldIndicator'
import { courseSchema } from '../schema'
import { addCourse } from '../action'

export const CourseForm = () => {
  const form = useForm<InferInput<typeof courseSchema>>({
    resolver: valibotResolver(courseSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const onSubmit = async (data: InferInput<typeof courseSchema>) => {
    await addCourse(data)

    toast('Course has been created.')
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredFieldIndicator />
                  <span>Description</span>
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-20 resize-none" {...field} />
                </FormControl>
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
