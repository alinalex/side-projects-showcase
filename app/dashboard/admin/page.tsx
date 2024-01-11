import { getSideProjects } from "@/app/supabaseRequests";
import SideProjectsList from "@/components/dashboard/SideProjectsList";
import { Button } from "@/components/ui/button";
import { getUserData, getUserToken } from "@/lib/authUtils";
import checkUserInfo from "@/lib/checkUserInfo";
import { SignOutButton, currentUser } from "@clerk/nextjs";
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
    <section>
      <div className="flex justify-between items-center">
        <h1>Dashboard</h1>
        <div className="flex items-center">
          <Button asChild className="mr-4">
            <Link href={`/${handler}`} target="_blank">View Portfolio</Link>
          </Button>
          <SignOutButton />
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