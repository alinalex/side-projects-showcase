'use client'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";
export default function Toaster({ showToast, variant = 'default', title, description }: { showToast: boolean, variant?: "default" | "destructive" | null | undefined, title: string, description: string }) {
  const { toast } = useToast();

  useEffect(() => {
    if (showToast) {
      toast({
        variant,
        title,
        description,
      })
    }
  }, [showToast])

  return <></>
}