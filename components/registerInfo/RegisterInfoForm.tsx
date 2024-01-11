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
      <FormTextItem label="Your first name" placeholder="enter your first name" id="firstName" name="firstName" errors={state?.errors?.firstName?._errors || []} className="form-item" maxLength={20} value={firstName} />

      <FormTextItem label="Your last name" placeholder="enter your last name" id="lastName" name="lastName" errors={state?.errors?.lastName?._errors || []} className="form-item" maxLength={20} value={lastName} />

      <FormImageUrlItem label="Your avatar image" placeholder="your avatar URL" id="imageSrc" name="imageSrc" errors={state?.errors?.imageSrc?._errors || []} className="form-item" initialImageUrl={imageSrc} />

      <FormTextItem label="Your description" placeholder="tell us a bit about yourself" id="description" name="description" errors={state?.errors?.description?._errors || []} className="form-item" maxLength={200} value={description} type="textarea" />

      <FormTextItem label="Your URL handler" placeholder="enter your URL handler, ex:johndoe" id="handler" name="handler" errors={state?.errors?.handler?._errors || []} className="form-item" maxLength={20} value={handler} />

      <div className="flex items-center">
        <SubmitButton title={'Save'} />
        {state?.dbError.length > 0 && <div className="ml-4"><FormError error={state.dbError} /></div>}
      </div>

      {
        state?.message && state?.message.length > 0
        && <p aria-live="polite" className="sr-only" role="status">{state?.message}</p>
      }

    </form>
  )
}