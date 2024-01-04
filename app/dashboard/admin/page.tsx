import { getHandler } from "@/app/supabaseRequests";
import { getUserId, getUserToken } from "@/lib/authUtils";
import checkUserInfo from "@/lib/checkUserInfo";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

function redirectToRegisterInfo() {
    redirect('/register/info');
}

export default async function Dashboard() {
    // no user then redirect to lp page
    const user = await currentUser();
    if (!user) redirect('/');

    // check if user has info data, if not direct to register info page
    const userId = getUserId();
    const token = await getUserToken();
    const { data: handlerData, error } = await getHandler({ userId, token });
    if (error || handlerData?.length === 0) {
        redirectToRegisterInfo();
    }
    const hasUserInfo = checkUserInfo({ user });
    if (!hasUserInfo) {
        redirectToRegisterInfo();
    }

    // console.log('user', user);
    return (
        <div>dashboard</div>
    )
}