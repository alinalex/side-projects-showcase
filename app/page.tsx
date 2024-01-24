import {
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { HammerIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <section>
      <div className="flex justify-between items-center flex-col lg:flex-row">
        <Link href="/">
          <div className="flex cursor-pointer mb-2 lg:mb-0">
            <HammerIcon className="mr-2" />
            <h1 className="text-lg font-medium capitalize">side projects showcase</h1>
          </div>
        </Link>
        <div>
          <SignedIn>
            <Button asChild variant={'secondary'}>
              <Link href='/dashboard/admin' className="p-4 mr-4">Go to Dashboard</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild><Link href='/sign-in' className="p-4 mr-4">Sign In</Link></Button>
            <Button asChild><Link href='/sign-up' className="p-4">Sign Up</Link></Button>
          </SignedOut>
        </div>
      </div>
      <div className="lg:px-4">
        <div className="mt-12 flex items-center justify-between flex-col lg:flex-row">
          <div className="lg:mr-10 mb-10 lg:mb-0 lg:max-w-xl max-w-3xl">
            <h2 className="text-4xl mb-4 font-medium">Bring your side projects back to life</h2>
            <p className="text-lg">Exhibit your coding prowess and share your projects with the world.</p>
            <p className="text-lg">Whether you're a seasoned developer or just starting your coding journey, Side Projects Showcase is the perfect stage for your creations.</p>
            <Button asChild className="mt-4">
              <Link href='/sign-up' className="p-4">Get Started</Link>
            </Button>
          </div>
          <Image src='/hero.svg' alt='hero' sizes="100vw" width={500} height={500} />
        </div>
        <div className="mt-12">
          <h2 className="text-4xl mb-4 font-medium">Why Side Projects Showcase?</h2>
          <p className="text-lg mb-4">🌟 <span className="font-bold">Showcase Your Skills:</span> Display your coding achievements proudly. Let your projects speak volumes about your expertise, creativity, and problem-solving abilities.</p>
          <p className="text-lg mb-4">🚀 <span className="font-bold">Build Your Portfolio:</span> Your personal coding portfolio is just a click away. Impress potential employers, collaborators, or clients with a professional display of your projects.</p>
          <p className="text-lg mb-4">💡 <span className="font-bold">Inspiration and Learning:</span> Explore a diverse range of projects for inspiration. Learn new techniques, discover innovative solutions, and stay at the forefront of the ever-evolving tech landscape.</p>
        </div>
        <div className="mt-12">
          <h2 className="text-4xl mb-4 font-medium">How It Works</h2>
          <p className="text-lg mb-4"><span className="font-bold">1. Create Your Profile:</span> Sign up and choose your user handler. Add your full name, profile image, and a brief bio to let the everybody know who you are.</p>
          <p className="text-lg mb-4"><span className="font-bold">2. Showcase Your Projects:</span> Upload your side projects with detailed description, tagline, logo url, tech stack, hashtags and the urls of your side project and the code repository. Let your work shine!</p>
          <p className="text-lg mb-4"><span className="font-bold">3. Share your side projects URL:</span> Watch as your projects gain visibility. Receive feedback, accolades, and maybe even collaboration offers.</p>
        </div>
      </div>
      <div className="w-full text-center mt-12">© {currentYear} | made by <Link href='https://alinrauta.com'>alinrauta.com</Link></div>
    </section>
  )
}
