import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function PopupDialog({ btnText, itemName, open, setOpen, handleCancel, handleContinue, inProgress }: { btnText: string, itemName: string, open: boolean, setOpen: (value: boolean) => void, handleCancel: () => void, handleContinue: () => void, inProgress: boolean }) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{btnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {' '}{itemName} and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleCancel} variant={'ghost'}>Cancel</Button>
          <Button variant="destructive" onClick={handleContinue} disabled={inProgress}>{inProgress ? <>Deleting...<Loader2 className="ml-2 h-4 w-4 animate-spin" /></> : 'Continue'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}