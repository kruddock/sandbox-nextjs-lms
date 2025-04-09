import { PageHeader } from '@/components/PageHeader'
import { CourseForm } from '@/features/courses/components/CourseForm'

const NewCoursePage = () => {
  return (
    <div className="container my-6">
      <PageHeader title="New Course" />
      <CourseForm />
    </div>
  )
}

export default NewCoursePage
