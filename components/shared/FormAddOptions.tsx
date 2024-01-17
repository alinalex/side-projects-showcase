import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormFieldItemError from "./FormFieldItemError"
import { Button } from "../ui/button"
import { XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { formInputClass } from "@/constants"

export default function FormAddOptions({ label, placeholder, id, name, errors, className, btnTitle, initialOptions = [] }: { label: string, placeholder: string, id: string, name: string, errors: string[], className: string, btnTitle: string, initialOptions?: string[] }) {
  const [shouldShowError, setShouldShowError] = useState(true);
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

  useEffect(() => {
    setShouldShowError(!optionsArray.toString().length);
  }, [optionsArray])

  return (
    <div className={`${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-col sm:flex-row items-center">
        <Input type="text" placeholder={placeholder} value={optionsInputValue} onChange={(e) => setOptionsInputValue(e.target.value)} className={formInputClass} />
        <Button disabled={!optionsInputValue.length} className="mt-2 ml-0 sm:mt-0 sm:ml-4 w-full sm:w-fit" onClick={addOption} variant={'secondary'}>{btnTitle}</Button>
      </div>
      <div className="flex items-center">
        {optionsArray.map((option, index) => (
          <div key={`${option}${index}`} className="flex items-center mr-4 last:mr-0">
            <div>{option}</div>
            <XCircle className="ml-2 cursor-pointer" onClick={(e) => deleteOption(option)} />
          </div>
        ))}
      </div>
      <Input type="hidden" id={id} name={name} value={optionsArray.toString()} />
      {shouldShowError && <FormFieldItemError errors={errors} />}
    </div>
  )
}