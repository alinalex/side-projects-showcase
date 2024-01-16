'use client'
import type { SideProjectDBRow } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PopupDialogWrapper from "@/components/shared/PopupDialogWrapper";
import Toaster from "../shared/Toaster";
import { useState } from "react";
import { deleteProject } from "@/app/actions/deleteProject";

export default function SideProjectsList({ sideProjectsData, handler, userId, token }: { sideProjectsData: SideProjectDBRow[], handler: string, userId: string, token: string }) {

  const [shouldClose, setShouldClose] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // delete project
  async function handleDeleteSideProject({ sideProjectId }: { sideProjectId: string }) {
    const { response } = await deleteProject({ userId, token, sideProjectId, handler });
    setShouldClose(true);
    if (!response) setShowToast(true);
  }

  return (
    <>
      <div>
        {sideProjectsData?.map(elem => (
          <div key={elem.id} className="flex justify-between items-center py-3 px-2 hover:bg-purple-btn/10">
            <div className="flex items-center">
              <img src={elem.logoUrl} alt="side-project-logo" className="w-[48px] h-[48px] rounded mr-3" />
              <p>{elem.name}</p>
            </div>
            <div className="flex items-center">
              <Button asChild className="mr-2" variant={'link'}>
                <Link href={`/${handler}/${elem.url_id}`} target="_blank">View Project</Link>
              </Button>
              <Button asChild className="mr-2" variant={'secondary'}>
                <Link href={`/dashboard/admin/${elem.url_id}/edit`}>Edit Project</Link>
              </Button>
              <PopupDialogWrapper shouldClose={shouldClose} btnText="Delete Project" itemName="side-project" sideProjectId={elem.url_id} handleDeleteSideProject={handleDeleteSideProject} />
            </div>
          </div>
        ))
        }
      </div>
      <Toaster showToast={showToast} variant={"destructive"} title="Uh oh! Something went wrong." description="There was a problem with your request and couldn't delete your side-project. Please try again." />
    </>
  )
}