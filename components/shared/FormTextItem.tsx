import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import FormFieldItemError from "./FormFieldItemError"
import { ChangeEvent, useState } from "react"

export default function FormTextItem({ type = 'input', label, placeholder, id, name, errors, className, maxLength = 0, value = '' }: { label: string, placeholder: string, id: string, name: string, errors: string[], className: string, maxLength?: number, value?: string, type?: 'input' | 'textarea' }) {
  const [shouldShowError, setShouldShowError] = useState(true);
  const [currentLength, setCurrentLength] = useState(value.length);
  const hasMaxLength = maxLength > 0;

  function handleOnChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    setShouldShowError(!e.target.value.length);
    setCurrentLength(e.target.value.length);
  }

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center">
        <Label htmlFor={name}>{label}</Label>
        {hasMaxLength && <p className="text-sm">{currentLength}/{maxLength}</p>}
      </div>
      {
        type === 'input' ? <Input type="text" autoComplete="off" placeholder={placeholder} id={id} name={name} onChange={handleOnChange} defaultValue={value} maxLength={hasMaxLength ? maxLength : undefined} /> : <Textarea placeholder={placeholder} id={id} name={name} onChange={handleOnChange} defaultValue={value} maxLength={hasMaxLength ? maxLength : undefined} rows={4} autoComplete="off" />
      }
      {shouldShowError && <FormFieldItemError errors={errors} />}
    </div >
  )
}