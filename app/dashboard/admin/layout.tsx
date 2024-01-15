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
  if (!userData.length) return null;
  const handler = userData[0].handler;
  return (
    <section className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1><Link href={'/dashboard/admin'}>Dashboard</Link></h1>
        <div className="flex items-center">
          <Button asChild className="mr-4" variant={'link'}>
            <Link href={'/dashboard/admin/account-settings'}>Account Settings</Link>
          </Button>
          <Button asChild className="mr-4" variant={'link'}>
            <Link href={`/${handler}`} target="_blank">View Portfolio</Link>
          </Button>
          <SignOutButton />
        </div>
      </div>
      {children}
    </section>
  )
}
