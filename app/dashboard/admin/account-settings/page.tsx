'use server'
import RegisterInfoForm from "@/components/registerInfo/RegisterInfoForm";
import FormShell from "@/components/shared/FormShell";
import { formatUserData } from "@/lib/authUtils";
import { currentUser } from "@clerk/nextjs";

export default async function RegisterInfo() {
  const user = await currentUser();
  if (!user) return null;

  const userData = await formatUserData({ userId: user?.id });

  return (
    <FormShell>
      <div className="form-title">Account Settings</div>
      <RegisterInfoForm user={userData} />
    </FormShell>
  )
}