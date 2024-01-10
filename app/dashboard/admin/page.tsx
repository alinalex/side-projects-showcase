import { getSideProjects } from "@/app/supabaseRequests";
import SideProjectsList from "@/components/dashboard/SideProjectsList";
import { Button } from "@/components/ui/button";
import { getUserHandler, getUserToken } from "@/lib/authUtils";
import checkUserInfo from "@/lib/checkUserInfo";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

function redirectToRegisterInfo() {
  redirect('/register/info');
}

export default async function Dashboard() {
  // no user then redirect to lp page
  const user = await currentUser();
  if (!user) redirect('/');

  // check if user has info data, if not direct to register info page
  const { handler } = await getUserHandler();
  if (!handler.length) {
    redirectToRegisterInfo();
  }
  const hasUserInfo = checkUserInfo({ user });
  if (!hasUserInfo) {
    redirectToRegisterInfo();
  }

  // get projects
  const token = await getUserToken();
  const { data: sideProjectsData, error } = await getSideProjects({ userId: user.id, token });

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1>Dashboard</h1>
        <div className="flex items-center">
          <Button asChild className="mr-4">
            <Link href={`/${handler}`} target="_blank">View Portfolio</Link>
          </Button>
          <UserButton />
        </div>
      </div>
      <div className="mt-6">
        <Button asChild><Link href="/dashboard/admin/add">Add Project</Link></Button>
      </div>
      <div className="mt-6">
        <SideProjectsList sideProjectsData={sideProjectsData} handler={handler} userId={user?.id} token={token as string} />
      </div>
    </section>
  )
}