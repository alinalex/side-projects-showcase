'use server'
import RegisterInfoForm from "@/components/registerInfo/RegisterInfoForm";
import { formatUserData } from "@/lib/authUtils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RegisterInfo() {
  const user = await currentUser();
  if (!user) redirect('/');

  const userData = await formatUserData({ userId: user?.id });

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl rounded-[48px] bg-white p-10 flex justify-center">
        <div className="w-full">
          <div className="form-title">Account Settings</div>
          <RegisterInfoForm user={userData} />
        </div>
      </div>
    </section>
  )
}