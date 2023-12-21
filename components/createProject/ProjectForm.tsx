'use client'

import { useFormState } from "react-dom"
import { createProject } from "@/app/actions"
import { addSideProjectFormErrors } from "@/constants"
import { CreateProjectState } from "@/types"
import SubmitButton from "@/components/shared/SubmitButton"
import FormTextItem from "@/components/shared/FormTextItem"
import FormImageUrlItem from "@/components/shared/FormImageUrlItem"
import FormAddOptions from "@/components/shared/FormAddOptions"
import FormError from "@/components/shared/FormError"

const initialState: CreateProjectState = {
  message: '',
  errors: addSideProjectFormErrors,
  dbError: '',
}

export default function ProjectForm() {
  const [state, formAction] = useFormState(createProject, initialState)
  return (
    <form action={formAction} className="">

      <FormTextItem label="Enter side-project name" placeholder="your side-project name" id="sideProjectName" name="sideProjectName" errors={state?.errors?.sideProjectName?._errors || []} className="form-item" maxLength={40} />

      <FormImageUrlItem label="Paste a URL for your side-project logo" placeholder="your side-project logo URL" id="sideProjectLogoUrl" name="sideProjectLogoUrl" errors={state?.errors?.sideProjectLogoUrl?._errors || []} className="form-item" />

      <FormTextItem label="Enter side-project tagline" placeholder="your side-project tagline" id="sideProjectTagline" name="sideProjectTagline" errors={state?.errors?.sideProjectTagline?._errors || []} className="form-item" maxLength={60} />

      <FormTextItem label="Enter side-project description" placeholder="your side-project description" id="sideProjectDescription" name="sideProjectDescription" errors={state?.errors?.sideProjectDescription?._errors || []} className="form-item" maxLength={260} type="textarea" />

      <FormTextItem label="Enter side-project URL" placeholder="your side-project URL" id="sideProjectUrl" name="sideProjectUrl" errors={state?.errors?.sideProjectUrl?._errors || []} className="form-item" />

      <FormTextItem label="Enter side-project code repository URL" placeholder="your side-project code repository URL" id="sideProjectCodeUrl" name="sideProjectCodeUrl" errors={state?.errors?.sideProjectCodeUrl?._errors || []} className="form-item" />

      <FormAddOptions label="Enter side-project tech stack" placeholder="your side-project tech stack" id="sideProjectTechStackInput" name="sideProjectTechStack" errors={state?.errors?.sideProjectTechStack?._errors || []} className="form-item" btnTitle="Add techonology" />

      <FormAddOptions label="Enter side-project topics" placeholder="your side-project topics" id="sideProjectTopicsInput" name="sideProjectTopic" errors={state?.errors?.sideProjectTopic?._errors || []} className="form-item" btnTitle="Add topic" />

      <div className="flex items-center">
        <SubmitButton title={'Create side-project'} />
        {state?.dbError.length > 0 && <div className="ml-4"><FormError error={state.dbError} /></div>}
      </div>

      {
        state?.message && state?.message.length > 0
        && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
      }

    </form>
  )
}