import FormError from "./FormError";

export default function FormFieldItemError({ errors }: { errors: string[] }) {
  if (!errors?.length) return null;
  return (
    <div>
      {errors.map((error, index) => <FormError key={index} error={error} />)}
    </div>
  )
}