import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div>side projects showcase</div>
        <div>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in' className="p-4">Sign In</Link>
            <Link href='/sign-up' className="p-4">Sign Up</Link>
          </SignedOut>
        </div>
      </div>
      <div className="mt-5">lp page</div>
    </section>
  )
}
