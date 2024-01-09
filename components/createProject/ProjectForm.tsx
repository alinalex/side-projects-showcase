'use client'

import { useFormState } from "react-dom"
import { createProject } from "@/app/actions"
import { addSideProjectFormErrors } from "@/constants"
import type { CreateProjectState, SideProject } from "@/types"
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

const dummySideProjectData = {
  sideProjectName: '',
  sideProjectLogoUrl: '',
  sideProjectTagline: '',
  sideProjectDescription: '',
  sideProjectUrl: '',
  sideProjectCodeUrl: '',
  sideProjectTechStack: '',
  sideProjectTopic: '',
}

export default function ProjectForm({ sideProjectData = dummySideProjectData, type, handler = '', sideProjectId = '', handlerId = '' }: { sideProjectData?: SideProject, type: string, handler?: string, sideProjectId?: string, handlerId?: string }) {

  const createOrUpdateProject = createProject.bind(null, type, handler, sideProjectId, handlerId);
  const [state, formAction] = useFormState(createOrUpdateProject, initialState);
  const { sideProjectName, sideProjectLogoUrl, sideProjectTagline, sideProjectDescription, sideProjectUrl, sideProjectCodeUrl, sideProjectTechStack, sideProjectTopic } = sideProjectData;
  const sideProjectTechStackArray = sideProjectTechStack.length > 0 ? sideProjectTechStack.split(',') : [];
  const sideProjectTopicArray = sideProjectTopic.length > 0 ? sideProjectTopic.split(',') : [];

  return (
    <form action={formAction} className="">

      <FormTextItem label="Enter side-project name" placeholder="your side-project name" id="sideProjectName" name="sideProjectName" errors={state?.errors?.sideProjectName?._errors || []} className="form-item" maxLength={40} value={sideProjectName} />

      <FormImageUrlItem label="Paste a URL for your side-project logo" placeholder="your side-project logo URL" id="sideProjectLogoUrl" name="sideProjectLogoUrl" errors={state?.errors?.sideProjectLogoUrl?._errors || []} className="form-item" initialImageUrl={sideProjectLogoUrl} />

      <FormTextItem label="Enter side-project tagline" placeholder="your side-project tagline" id="sideProjectTagline" name="sideProjectTagline" errors={state?.errors?.sideProjectTagline?._errors || []} className="form-item" maxLength={60} value={sideProjectTagline} />

      <FormTextItem label="Enter side-project description" placeholder="your side-project description" id="sideProjectDescription" name="sideProjectDescription" errors={state?.errors?.sideProjectDescription?._errors || []} className="form-item" maxLength={260} type="textarea" value={sideProjectDescription} />

      <FormTextItem label="Enter side-project URL" placeholder="your side-project URL" id="sideProjectUrl" name="sideProjectUrl" errors={state?.errors?.sideProjectUrl?._errors || []} className="form-item" value={sideProjectUrl} />

      <FormTextItem label="Enter side-project code repository URL" placeholder="your side-project code repository URL" id="sideProjectCodeUrl" name="sideProjectCodeUrl" errors={state?.errors?.sideProjectCodeUrl?._errors || []} className="form-item" value={sideProjectCodeUrl} />

      <FormAddOptions label="Enter side-project tech stack" placeholder="your side-project tech stack" id="sideProjectTechStackInput" name="sideProjectTechStack" errors={state?.errors?.sideProjectTechStack?._errors || []} className="form-item" btnTitle="Add techonology" initialOptions={sideProjectTechStackArray} />

      <FormAddOptions label="Enter side-project topics" placeholder="your side-project topics" id="sideProjectTopicsInput" name="sideProjectTopic" errors={state?.errors?.sideProjectTopic?._errors || []} className="form-item" btnTitle="Add topic" initialOptions={sideProjectTopicArray} />

      <div className="flex items-center">
        <SubmitButton title={type === 'add' ? 'Create side-project' : 'Update side-project'} />
        {state?.dbError.length > 0 && <div className="ml-4"><FormError error={state.dbError} /></div>}
      </div>

      {
        state?.message && state?.message.length > 0
        && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
      }

    </form>
  )
}