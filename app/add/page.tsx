'use client'

import { useFormState, useFormStatus } from "react-dom"
import { createProject } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle } from "lucide-react"
import { ZodFormattedError } from "zod"
import { addSideProjectFormErrors } from "@/constants"

const initialState: {
  message: string, errors: ZodFormattedError<{
    sideProjectName: string;
    sideProjectUrl: string;
    sideProjectDescription: string;
    sideProjectTechStack: string
  }, string>,
  dbEror: string
} = {
  message: '',
  errors: addSideProjectFormErrors,
  dbEror: '',
}

function SubmitButton({ disabled = false }: { disabled?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending} disabled={disabled || pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add
    </Button>
  )
}

function FormFieldItemError({ errors }: { errors: string[] }) {
  if (!errors?.length) return null;
  return (
    <div>
      {errors.map((error, index) => <div key={index} className="text-red-800 flex items-center"><AlertTriangle /><p className="ml-2">Error: {error}</p></div>)}
    </div>
  )
}

export default function AddProject() {
  const [state, formAction] = useFormState(createProject, initialState)

  console.log('state', state);

  return (
    <div className="max-w-xl">
      <div className="mb-4">Add your side project</div>
      <form action={formAction} className="">
        <div className="form-item">
          <Label htmlFor="sideProjectName">Enter side-project name</Label>
          <Input type="text" placeholder="your side-project name" id="sideProjectName" name="sideProjectName" />
          <FormFieldItemError errors={state?.errors?.sideProjectName?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectUrl">Enter side-project URL</Label>
          <Input type="text" placeholder="your side-project URL" id="sideProjectUrl" name="sideProjectUrl" />
          <FormFieldItemError errors={state?.errors?.sideProjectUrl?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectDescription">Enter side-project description</Label>
          <Input type="text" placeholder="your side-project description" id="sideProjectDescription" name="sideProjectDescription" />
          <FormFieldItemError errors={state?.errors?.sideProjectDescription?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectTechStack">Enter side-project tech stack</Label>
          <Input type="text" placeholder="your side-project tech stack" id="sideProjectTechStack" name="sideProjectTechStack" />
          <FormFieldItemError errors={state?.errors?.sideProjectTechStack?._errors || []} />
        </div>
        <SubmitButton />
        {
          state?.message.length > 0
          && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
        }
      </form>
    </div>
  )
}