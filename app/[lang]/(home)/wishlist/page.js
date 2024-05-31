import { auth } from '@/auth';
import Fav from '@/components/common/Fav';
import { redirect } from 'next/navigation';

export default async function WishListPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <Fav />
        </>
    );
}