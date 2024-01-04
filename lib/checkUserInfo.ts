export default function checkUserInfo({ user }: { user: any }) {
    if (!user.firstName || !user.lastName || !user.imageUrl || !user.unsafeMetadata.description) return false;
    return true;
}