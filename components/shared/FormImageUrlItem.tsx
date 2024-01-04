import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormFieldItemError from "./FormFieldItemError";
import { useEffect, useState } from "react";
import PasteUrlDialog from "../createProject/PasteUrlDialog";
import { XCircle } from "lucide-react";

export default function FormImageUrlItem({ label, placeholder, id, name, errors, className, initialImageUrl = '' }: { label: string, placeholder: string, id: string, name: string, errors: string[], className: string, initialImageUrl?: string }) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [shouldShowError, setShouldShowError] = useState(true);

  useEffect(() => {
    setShouldShowError(!imageUrl.length)
  }, [imageUrl])

  return (
    <div className={`${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center pt-4">
        <div className="mr-8 w-[80px] h-[80px] relative">
          {imageUrl.length === 0 ? <div className="w-full h-full border-2 border-dashed rounded-[4px] border-[#d9e1ec]" /> :
            <div className="logoWrapper"><img src={imageUrl} alt="logo" className="w-full h-full" /><XCircle className="absolute -top-3 -right-3 cursor-pointer" onClick={(e) => setImageUrl('')} /></div>}
        </div>
        <PasteUrlDialog url={imageUrl} saveChanges={(url) => setImageUrl(url)} />
        <Input type="hidden" placeholder={placeholder} id={id} name={name} value={imageUrl} />
      </div>
      {shouldShowError && <FormFieldItemError errors={errors} />}
    </div>
  )
}