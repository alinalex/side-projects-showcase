'use client';
import PopupDialog from "@/components/shared/PopupDialog";
import { useEffect, useState } from "react";

export default function PopupDialogWrapper({ btnText, itemName, sideProjectId, handleDeleteSideProject, shouldClose }: { btnText: string, itemName: string, sideProjectId: string, handleDeleteSideProject: ({ sideProjectId }: { sideProjectId: string }) => void, shouldClose: boolean }) {
  const [open, setOpen] = useState(false);
  const [inPogress, setInProgress] = useState(false);

  useEffect(() => {
    if (shouldClose) {
      setOpen(false);
    }
  }, [shouldClose])

  function handleCancel() {
    setOpen(false);
  }

  async function handleContinue() {
    setInProgress(true);
    handleDeleteSideProject({ sideProjectId });
  }

  return (
    <PopupDialog btnText={btnText} itemName={itemName} open={open} setOpen={setOpen} handleCancel={handleCancel} handleContinue={handleContinue} inProgress={inPogress} />
  )
}