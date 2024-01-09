'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId, getUserToken } from "@/lib/authUtils";
import type { UserInfo, UserInfoState } from "@/types";
import { userInfoSchema } from "@/zodSchemas/formSchemas";
import { checkIfHandlerExists, updateHandler } from '../supabaseRequests';
import { clerkClient } from '@clerk/nextjs';

async function updateUserData({ userId, data }: { userId: string, data: UserInfo }) {
  let error, res = null;
  try {
    res = await clerkClient.users.updateUser(userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      unsafeMetadata: { description: data.description }
    });
  } catch (err) {
    error = err;
  }
  return { res, error };
}

async function updateUserProfileImage({ userId, data }: { userId: string, data: UserInfo }) {
  let error, res = null;
  try {
    const r = await fetch(data.imageSrc);
    const fileBlob = await r.blob();
    res = await clerkClient.users.updateUserProfileImage(userId, { file: fileBlob })
  } catch (err) {
    error = err;
  }
  return { res, error };
}

async function updateUserHandler({ userId, data, token }: { userId: string, data: UserInfo, token: string }) {
  let error, res = null;
  try {
    const userData = await updateHandler({ userId, token, handler: data.handler });
    res = userData.data;
    error = userData.error;
  } catch (err) {
    error = err;
  }
  return { res, error };
}

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

  // check if handler already exists
  const token = await getUserToken() as string;
  const { data: handlerData, error } = await checkIfHandlerExists({ userId, token, handler: data.handler });
  console.log('handlerData', handlerData);
  if (error || (handlerData && handlerData.length > 0)) return { message: 'This handler already exists. Please pick another one', errors: prevState.errors, dbError: 'This handler already exists. Please pick another one' }

  try {
    const [updateUserDataRes, updateUserProfileImageRes, updateUserHandlerRes] = await Promise.all([updateUserData({ userId, data }), updateUserProfileImage({ userId, data }), updateUserHandler({ userId, data, token })])
    const possibleError = updateUserHandlerRes.error || updateUserDataRes.error || updateUserProfileImageRes.error;
    if (possibleError) throw possibleError;
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