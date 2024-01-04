'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId, getUserToken } from "@/lib/authUtils";
import type { UserInfoState } from "@/types";
import { userInfoSchema } from "@/zodSchemas/formSchemas";
import { updateHandler } from '../supabaseRequests';
import { clerkClient } from '@clerk/nextjs';


export async function updateUserInfo(prevState: UserInfoState, formData: FormData) {
  const parse = userInfoSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    imageSrc: formData.get('imageSrc'),
    description: formData.get('description'),
    handler: formData.get('handler'),
  });

  if (!parse.success) {
    return { message: 'Failed to create side-project', errors: parse.error.format(), dbError: prevState.dbError }
  }

  const data = parse.data;
  let databaseSuccess = true;
  const userId = getUserId() as string;
  const user = await clerkClient.users.getUser(userId);
  if (!user) return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }

  try {
    await clerkClient.users.updateUser(userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      unsafeMetadata: { description: data.description }
    });
  } catch (error) {
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }

  try {
    const r = await fetch(data.imageSrc);
    const fileBlob = await r.blob();
    await clerkClient.users.updateUserProfileImage(userId, { file: fileBlob })
  } catch (error) {
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }

  try {
    const token = await getUserToken();
    const { data: response, error } = await updateHandler({ userId, token, handler: data.handler });
    if (error) throw error;
  } catch (e) {
    databaseSuccess = false;
  } finally {
    if (databaseSuccess) {
      revalidatePath('/')
      redirect('/dashboard/admin');
    }
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }
}