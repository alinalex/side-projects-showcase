'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId, getUserToken } from "@/lib/authUtils";
import type { UserInfoState } from "@/types";
import { userInfoSchema } from "@/zodSchemas/formSchemas";
import { checkIfHandlerExists, updateUserData } from '../supabaseRequests';
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
    return { message: 'Failed to update your info', errors: parse.error.format(), dbError: prevState.dbError }
  }

  const data = parse.data;
  // check for handler regex
  const isRegexValid = /^[a-z]+$/.test(data.handler);
  if (!isRegexValid) {
    return { message: 'Handler shouldn\'t contain blank spaces, numbers, uppercase letters or special characters.', errors: prevState.errors, dbError: 'handler shouldn\'t contain blank spaces, numbers, uppercase letters or special characters.' }
  }

  let databaseSuccess = true;
  const userId = getUserId() as string;
  const user = await clerkClient.users.getUser(userId);
  if (!user) return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }

  // check if handler already exists
  const token = await getUserToken() as string;
  const { data: handlerData, error } = await checkIfHandlerExists({ userId, token, handler: data.handler });

  if (error || (handlerData && handlerData.length > 0)) return { message: 'This handler already exists. Please pick another one', errors: prevState.errors, dbError: 'This handler already exists. Please pick another one' }

  try {
    const { data: updatedUserData, error } = await updateUserData({ userId, token, userData: data });
    if (error) throw error;
  } catch (error) {
    databaseSuccess = false;
  } finally {
    if (databaseSuccess) {
      revalidatePath('/')
      redirect('/dashboard/admin');
    }
    return { message: 'An error occured, please try again.', errors: prevState.errors, dbError: 'An error occured, please try again.' }
  }
}