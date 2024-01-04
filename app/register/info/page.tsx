'use server'
import RegisterInfoForm from "@/components/registerInfo/RegisterInfoForm";
import { formatUserData } from "@/lib/authUtils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RegisterInfo() {
  const user = await currentUser();
  if (!user) redirect('/');

  const userData = await formatUserData({ user });

  return (
    <section className="max-w-xl">
      <div className="mb-4">Edit your info</div>
      <RegisterInfoForm user={userData} />
    </section>
  )
}