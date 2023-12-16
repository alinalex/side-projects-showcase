import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormFieldItemError from "./FormFieldItemError"
import { Button } from "../ui/button"
import { XCircle } from "lucide-react"
import { useState } from "react"

export default function FormAddOptions({ label, placeholder, id, name, errors, className, btnTitle, initialOptions = [] }: { label: string, placeholder: string, id: string, name: string, errors: string[], className: string, btnTitle: string, initialOptions?: string[] }) {
  const [optionsArray, setOptionsArray] = useState<string[]>(initialOptions);
  const [optionsInputValue, setOptionsInputValue] = useState('');

  function addOption() {
    if (!optionsInputValue.length) return;
    setOptionsArray(prevState => ([...prevState, optionsInputValue]));
    setOptionsInputValue('');
  }
  function deleteOption(option: string) {
    const updatedTechnologies = optionsArray.filter(elem => elem !== option);
    setOptionsArray(updatedTechnologies);
  }

  return (
    <div className={`${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center">
        <Input type="text" placeholder={placeholder} value={optionsInputValue} onChange={(e) => setOptionsInputValue(e.target.value)} />
        <Button disabled={!optionsInputValue.length} className="ml-4" onClick={addOption}>{btnTitle}</Button>
      </div>
      <div className="flex items-center">
        {optionsArray.map(option => (
          <div key={option} className="flex items-center mr-4 last:mr-0">
            <div>{option}</div>
            <XCircle className="ml-2 cursor-pointer" onClick={(e) => deleteOption(option)} />
          </div>
        ))}
      </div>
      <Input type="hidden" id={id} name={name} value={optionsArray.toString()} />
      <FormFieldItemError errors={errors} />
    </div>
  )
}