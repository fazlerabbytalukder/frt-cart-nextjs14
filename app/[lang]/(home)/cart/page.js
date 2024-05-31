import { auth } from "@/auth";
import Cart from "@/components/common/Cart";
import { redirect } from "next/navigation";

export default async function CartPage({ params: { lang } }) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }
    return (
        <>
            <Cart lang={lang} />
        </>
    );
}