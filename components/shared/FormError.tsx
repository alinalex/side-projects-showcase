import { AlertTriangle } from "lucide-react";

export default function FormError({ error }: { error: string }) {
  return (
    <div className="text-red-800 flex items-center"><AlertTriangle /><p className="ml-2">Error: {error}</p></div>
  )
}