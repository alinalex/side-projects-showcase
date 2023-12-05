'use client'

import { useFormState, useFormStatus } from "react-dom"
import { createProject } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle, XCircle } from "lucide-react"
import { ZodFormattedError } from "zod"
import { addSideProjectFormErrors } from "@/constants"
import { useState } from "react"

const initialState: {
  message: string, errors: ZodFormattedError<{
    sideProjectName: string;
    sideProjectUrl: string;
    sideProjectCodeUrl: string;
    sideProjectDescription: string;
    sideProjectTechStack: string;
    sideProjectTopic: string;
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
  const [sideProjectTechStackArray, setSideProjectTechStackArray] = useState<string[]>([]);
  const [sideProjectTopicArray, setSideProjectTopicArray] = useState<string[]>([]);
  const [sideProjectTopicInputValue, setSideProjectTopicInputValue] = useState('');
  const [sideProjectTechStackInputValue, setSideProjectTechStackInputValue] = useState('');

  function addTechnology() {
    if (!sideProjectTechStackInputValue.length) return;
    setSideProjectTechStackArray(prevState => ([...prevState, sideProjectTechStackInputValue]));
    setSideProjectTechStackInputValue('');
  }

  function addTopic() {
    if (!sideProjectTopicInputValue.length) return;
    setSideProjectTopicArray(prevState => ([...prevState, sideProjectTopicInputValue]));
    setSideProjectTopicInputValue('');
  }

  function deleteTechonology(tech: string) {
    const updatedTechnologies = sideProjectTechStackArray.filter(elem => elem !== tech);
    setSideProjectTechStackArray(updatedTechnologies);
  }

  function deleteTopic(topic: string) {
    const updatedTechnologies = sideProjectTopicArray.filter(elem => elem !== topic);
    setSideProjectTopicArray(updatedTechnologies);
  }

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
          <Label htmlFor="sideProjectCodeUrl">Enter side-project code repository URL</Label>
          <Input type="text" placeholder="your side-project URL" id="sideProjectCodeUrl" name="sideProjectCodeUrl" />
          <FormFieldItemError errors={state?.errors?.sideProjectCodeUrl?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectDescription">Enter side-project description</Label>
          <Input type="text" placeholder="your side-project description" id="sideProjectDescription" name="sideProjectDescription" />
          <FormFieldItemError errors={state?.errors?.sideProjectDescription?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectTechStack">Enter side-project tech stack</Label>
          <div className="flex items-center">
            <Input type="text" placeholder="your side-project tech stack" id="sideProjectTechStackInput" name="sideProjectTechStackInput" value={sideProjectTechStackInputValue} onChange={(e) => setSideProjectTechStackInputValue(e.target.value)} />
            <Button disabled={!sideProjectTechStackInputValue.length} className="ml-4" onClick={addTechnology}>Add techonology</Button>
          </div>
          <div className="flex items-center">
            {sideProjectTechStackArray.map(tech => (
              <div key={tech} className="flex items-center mr-4 last:mr-0">
                <div>{tech}</div>
                <XCircle className="ml-2 cursor-pointer" onClick={(e) => deleteTechonology(tech)} />
              </div>
            ))}
          </div>
          <Input type="hidden" id="sideProjectTechStack" name="sideProjectTechStack" value={sideProjectTechStackArray.toString()} />
          <FormFieldItemError errors={state?.errors?.sideProjectTechStack?._errors || []} />
        </div>
        <div className="form-item">
          <Label htmlFor="sideProjectTopic">Enter side-project topics</Label>
          <div className="flex items-center">
            <Input type="text" placeholder="your side-project topics" id="sideProjectTopicsInput" name="sideProjectTopicsInput" value={sideProjectTopicInputValue} onChange={(e) => setSideProjectTopicInputValue(e.target.value)} />
            <Button disabled={!sideProjectTopicInputValue.length} className="ml-4" onClick={addTopic}>Add topic</Button>
          </div>
          <div className="flex items-center">
            {sideProjectTopicArray.map(topic => (
              <div key={topic} className="flex items-center mr-4 last:mr-0">
                <div>{topic}</div>
                <XCircle className="ml-2 cursor-pointer" onClick={(e) => deleteTopic(topic)} />
              </div>
            ))}
          </div>
          <Input type="hidden" id="sideProjectTopic" name="sideProjectTopic" value={sideProjectTopicArray.toString()} />
          <FormFieldItemError errors={state?.errors?.sideProjectTopic?._errors || []} />
        </div>
        <SubmitButton />
        {
          state?.message && state?.message.length > 0
          && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
        }
      </form>
    </div>
  )
}