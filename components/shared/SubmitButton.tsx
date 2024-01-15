'use client'
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

export default function SubmitButton({ disabled = false, title }: { disabled?: boolean, title: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="default" aria-disabled={pending} disabled={disabled || pending}>
      {pending ? <>Saving...<Loader2 className="ml-2 h-4 w-4 animate-spin" /></> : title}
    </Button>
  )
}