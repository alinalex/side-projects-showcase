import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getUserData, getUserId } from "@/lib/authUtils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = getUserId() as string;
  if (!userId) return null;
  const { userData } = await getUserData({ userId });
  const handler = userData.length > 0 ? userData[0].handler : '';
  return (
    <section className="w-full h-full">
      <div className="fixed px-4 w-full top-4 left-0 z-50">
        <div className="flex flex-col sm:flex-row justify-between items-center px-3 border rounded-xl bg-app-bg">
          <h1 className="pt-2 sm:pt-0"><Link href={'/dashboard/admin'}>Dashboard</Link></h1>
          <div className="flex items-center">
            <Button asChild className="sm:mr-4 px-3 sm:px-4" variant={'link'}>
              <Link href={'/dashboard/admin/account-settings'}>Account Settings</Link>
            </Button>
            {handler.length > 0 && <Button asChild className="sm:mr-4 px-3 sm:px-4" variant={'link'}>
              <Link href={`/${handler}`} target="_blank">View Portfolio</Link>
            </Button>}
            <SignOutButton><Button variant={'link'} className="px-3 sm:px-4">Sign Out</Button></SignOutButton>
          </div>
        </div>
      </div>
      {children}
    </section>
  )
}
