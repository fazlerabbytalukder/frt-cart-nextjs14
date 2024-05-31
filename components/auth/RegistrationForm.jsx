'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegistrationForm() {
    const [error, setError] = useState("");

    const router = useRouter();

    async function onSubmit(event) {

        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get("confirm");

            // Validate password match
            if (password !== confirmPassword) {
                setError("Passwords do not match. Please try again.");
                return;
            }

            // Validate checkbox agreement
            const agreed = formData.get("aggrement");
            if (!agreed) {
                setError("Please agree to the terms & conditions.");
                return;
            }

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            res.status === 201 &&
                router.push("/login");
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className="text-xl text-red-500 text-center">{error && error}</div>
            <form onSubmit={onSubmit}>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                        <input type="text" name="name" id="name"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                        <input type="email" name="email" id="email"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="youremail.@domain.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                        <input type="password" name="password" id="password"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******" />
                    </div>
                    <div>
                        <label htmlFor="confirm" className="text-gray-600 mb-2 block">Confirm password</label>
                        <input type="password" name="confirm" id="confirm"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******" />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex items-center">
                        <input type="checkbox" name="aggrement" id="aggrement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                            href="#" className="text-primary">terms & conditions</a></label>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit"
                        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">create
                        account</button>
                </div>
            </form>
        </>
    );
}