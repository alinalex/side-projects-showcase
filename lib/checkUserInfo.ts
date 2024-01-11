import type { UserDataDb } from "@/types";

export default function checkUserInfo({ user }: { user: UserDataDb }) {
  if (!user.first_name || !user.last_name || !user.profileImageUrl || !user.description || !user.handler) {
    return false;
  }
  return true;
}