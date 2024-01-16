import { getSideProjects } from "@/app/supabaseRequests";
import SideProjectsList from "@/components/dashboard/SideProjectsList";
import { Button } from "@/components/ui/button";
import { getUserData, getUserToken } from "@/lib/authUtils";
import checkUserInfo from "@/lib/checkUserInfo";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

function redirectToRegisterInfo() {
  redirect('/dashboard/admin/account-settings');
}

export default async function Dashboard() {
  // no user then redirect to lp page
  const user = await currentUser();
  if (!user) redirect('/');

  // check if user has info data, if not direct to register info page
  const { userData } = await getUserData({ userId: user?.id });
  if (!userData.length) {
    redirectToRegisterInfo();
  }

  // check if user has complete data, if not direct to register info page
  const hasUserInfo = checkUserInfo({ user: userData[0] });
  if (!hasUserInfo) {
    redirectToRegisterInfo();
  }

  const handler = userData[0].handler;

  // get projects
  const token = await getUserToken();
  const { data: sideProjectsData, error } = await getSideProjects({ userId: user.id, token });

  return (
    <section className="mt-20">
      <div className="mt-6 flex justify-between items-center px-2">
        <div>
          <h3 className="font-bold">Manage side-projects</h3>
          <p className="text-sm">Create and manage side-projects.</p>
        </div>
        <Button asChild><Link href="/dashboard/admin/add">Add Project</Link></Button>
      </div>
      <div className="w-full h-px bg-slate-300 my-4"></div>
      <SideProjectsList sideProjectsData={sideProjectsData} handler={handler} userId={user?.id} token={token as string} />
    </section >
  )
}