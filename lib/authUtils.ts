import { getHandler } from "@/app/supabaseRequests";
import { auth } from "@clerk/nextjs"

export function getUserId() {
  const { userId } = auth();
  return userId;
}

export async function getUserToken() {
  const { getToken } = auth();
  const token = await getToken({ template: 'supabase' });
  return token;
}

export async function formatUserData({ user }: { user: any }) {
  const userData = {
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    imageSrc: user.imageUrl as string,
    description: (user.unsafeMetadata?.description as string) || '',
    handler: '',
  }

  const userId = getUserId();
  const token = await getUserToken();
  const { data: handlerData, error } = await getHandler({ userId, token });
  if (!error && handlerData && handlerData?.length > 0) {
    userData.handler = handlerData[0].handler;
  }

  return userData;
}

export async function getUserHandler() {
  const userId = getUserId();
  const token = await getUserToken();
  const { data: handlerData, error } = await getHandler({ userId, token });
  if (error || (handlerData && !handlerData.length)) {
    return { handler: '', handlerId: '' };
  }
  return {
    handler: handlerData !== null && handlerData[0].handler || '',
    handlerId: handlerData !== null && handlerData[0].id || ''
  }
}