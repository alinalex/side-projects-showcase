import { getUserDataFromDB } from "@/app/supabaseRequests";
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

export async function formatUserData({ userId }: { userId: string }) {
  const userDataResponse = {
    firstName: '',
    lastName: '',
    imageSrc: '',
    description: '',
    handler: '',
  }

  const token = await getUserToken();
  const { data: userData, error } = await getUserDataFromDB({ columnValue: userId, token, column: "user_id" });

  if (!error && userData && userData?.length > 0) {
    userDataResponse.firstName = userData[0].first_name;
    userDataResponse.lastName = userData[0].last_name;
    userDataResponse.imageSrc = userData[0].profileImageUrl;
    userDataResponse.description = userData[0].description;
    userDataResponse.handler = userData[0].handler;
  }

  return userDataResponse;
}

export async function getUserData({ userId }: { userId: string }) {
  const token = await getUserToken();
  const { data: userData, error } = await getUserDataFromDB({ column: "user_id", columnValue: userId, token });
  if (error || (userData && !userData.length)) {
    return { userData: [] };
  }
  return {
    userData
  }
}