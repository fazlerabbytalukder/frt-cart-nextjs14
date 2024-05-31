'use client'

import { signIn } from "next-auth/react";

export default function SocialLogin() {
    const handleAuth = (event) => {
        signIn("google", { callbackUrl: 'https://frt-cart-nextjs14.vercel.app/cart' });
    }

    const handleFacebookAuth = (event) => {
        signIn("facebook", { callbackUrl: 'https://frt-cart-nextjs14.vercel.app/cart' });
    }
    return (
        <div className="mt-4 flex gap-4">
            <button
                onClick={handleFacebookAuth}
                className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</button>
            <button
                onClick={handleAuth}
                className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</button>
        </div>
    );
}