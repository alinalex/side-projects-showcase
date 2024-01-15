'use server'
import RegisterInfoForm from "@/components/registerInfo/RegisterInfoForm";
import FormShell from "@/components/shared/FormShell";
import { formatUserData } from "@/lib/authUtils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RegisterInfo() {
  const user = await currentUser();
  if (!user) redirect('/');

  const userData = await formatUserData({ userId: user?.id });

  return (
    <FormShell>
      <div className="form-title">Account Settings</div>
      <RegisterInfoForm user={userData} />
    </FormShell>
  )
}