'use client'
import { updateUserInfo } from "@/app/actions"
import { updateUserInfoFormErrors } from "@/constants"
import type { UserInfo, UserInfoState } from "@/types"
import { useFormState } from "react-dom"
import FormTextItem from "../shared/FormTextItem"
import FormImageUrlItem from "../shared/FormImageUrlItem"
import FormError from "../shared/FormError"
import SubmitButton from "../shared/SubmitButton"

const initialState: UserInfoState = {
  message: '',
  errors: updateUserInfoFormErrors,
  dbError: '',
}

export default function RegisterInfoForm({ user }: { user: UserInfo }) {
  const [state, formAction] = useFormState(updateUserInfo, initialState);
  const { firstName, lastName, imageSrc, description, handler } = user;
  return (
    <form action={formAction}>
      <FormTextItem label="Enter your first name" placeholder="your first name" id="firstName" name="firstName" errors={state?.errors?.firstName?._errors || []} className="form-item" maxLength={20} value={firstName} />

      <FormTextItem label="Enter your last name" placeholder="your last name" id="lastName" name="lastName" errors={state?.errors?.lastName?._errors || []} className="form-item" maxLength={20} value={lastName} />

      <FormImageUrlItem label="Paste a URL for your avatar" placeholder="your avatar URL" id="imageSrc" name="imageSrc" errors={state?.errors?.imageSrc?._errors || []} className="form-item" initialImageUrl={imageSrc} />

      <FormTextItem label="Enter your description" placeholder="your description" id="description" name="description" errors={state?.errors?.description?._errors || []} className="form-item" maxLength={60} value={description} />

      <FormTextItem label="Enter your handler" placeholder="your handler, ex:johndoe" id="handler" name="handler" errors={state?.errors?.handler?._errors || []} className="form-item" maxLength={20} value={handler} />

      <div className="flex items-center">
        <SubmitButton title={'Update your info'} />
        {state?.dbError.length > 0 && <div className="ml-4"><FormError error={state.dbError} /></div>}
      </div>

      {
        state?.message && state?.message.length > 0
        && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
      }

    </form>
  )
}