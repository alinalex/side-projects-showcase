import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import FormError from "@/components/shared/FormError"

export default function PasteUrlDialog({ url, saveChanges }: { url: string, saveChanges: (url: string) => void }) {

  const [innerUrlValue, setInnerUrlValue] = useState(url);
  const [urlError, setUrlError] = useState(false);
  const [open, setOpen] = useState(false);
  const isButtonDisabled = innerUrlValue.length === 0;

  function isImage(urlToCheck: string) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(urlToCheck);
  }

  async function checkImage(urlToCheck: string) {
    const img = new Image();
    img.src = urlToCheck;
    try {
      await img.decode();
      if (img.width > 0) return { status: true };
      return { status: false }
    } catch (error) {
      return { status: false };
    }
  }

  function getHostname(urlToCheck: string) {
    try {
      new URL(urlToCheck);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function checkIfImageExists(imageUrl: string) {
    let response = { status: false };
    if (!getHostname(imageUrl)) return response;
    if (!isImage(imageUrl)) return response;
    const doesImageLoad = await checkImage(imageUrl);
    return doesImageLoad;
  }

  async function handleSaveChanges() {
    const { status } = await checkIfImageExists(innerUrlValue);
    setUrlError(!status);

    if (status) {
      saveChanges(innerUrlValue);
      setOpen(false);
    }
  }

  useEffect(() => {
    setInnerUrlValue(url);
  }, [url])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Paste a URL</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Paste URL</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={innerUrlValue}
              onChange={(e) => { setInnerUrlValue(e.target.value); setUrlError(false); }}
            />
          </div>
          {urlError && <FormError error={'invalid URL.'} />}
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isButtonDisabled} onClick={(e) => handleSaveChanges()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}