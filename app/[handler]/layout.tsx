import { Button } from "@/components/ui/button"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import Link from "next/link"

export default function HandlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <SignedIn>
        <div className="flex justify-between items-center">
          <Button asChild variant={'link'}>
            <Link href='/dashboard/admin'>Go to dashboard</Link>
          </Button>
          <SignOutButton><Button variant={'link'}>Sign Out</Button></SignOutButton>
        </div>
      </SignedIn>
      {children}
    </section>
  )
}