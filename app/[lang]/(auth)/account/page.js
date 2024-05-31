import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaHouse } from "react-icons/fa6";

export default async function AccountPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <FaHouse />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Account</p>
            </div>
            <div className="container  items-start gap-6 pt-4 pb-16">

                <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">

                    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-800 text-lg">Personal Profile</h3>
                            <button className="text-primary">Edit</button>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-gray-700 font-medium">{session?.user?.name}</h4>
                            <p className="text-gray-800">{session?.user?.email}</p>
                            <p className="text-gray-800"></p>
                        </div>
                    </div>

                    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
                            <button className="text-primary">Edit</button>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-gray-700 font-medium">John Doe</h4>
                            <p className="text-gray-800">Medan, North Sumatera</p>
                            <p className="text-gray-800">0811 8877 988</p>
                        </div>
                    </div>

                    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-800 text-lg">Billing address</h3>
                            <button className="text-primary">Edit</button>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-gray-700 font-medium">John Doe</h4>
                            <p className="text-gray-800">Medan, North Sumatera</p>
                            <p className="text-gray-800">0811 8877 988</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}