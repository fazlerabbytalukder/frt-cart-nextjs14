import Image from "next/image";

import { auth } from "@/auth";
import bed2 from '@/public/images/icons/bed-2.svg';
import bed from '@/public/images/icons/bed.svg';
import outdoorcafe from '@/public/images/icons/outdoor-cafe.svg';
import sofa from '@/public/images/icons/sofa.svg';
import terrace from '@/public/images/icons/terrace.svg';
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import Logout from "../auth/Logout";


export default async function Navbar({ sidemenu, dictionary, lang }) {
    const session = await auth();

    return (
        <nav className="bg-gray-800">
            <div className="container flex mx-auto">
                <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                    <span className="text-white">
                        <FaBars />
                    </span>
                    <span className="capitalize ml-2 text-white hidden">All Categories</span>

                    <div className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]" style={{ width: "300px" }}>
                        <Link href={`${lang}/shop?category=Sofa`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                            <Image
                                src={sofa}
                                className="w-5 h-5 object-contain"
                                alt="sofa"
                            />
                            <span className="ml-6 text-gray-600 text-sm">{dictionary.sofa}</span>
                        </Link>
                        <Link href={`${lang}/shop?category=Living`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                            <Image
                                src={terrace}
                                className="w-5 h-5 object-contain"
                                alt="terrace"
                            />
                            <span className="ml-6 text-gray-600 text-sm">{dictionary.living}</span>
                        </Link>
                        <Link href={`${lang}/shop?category=Bedroom`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                            <Image
                                src={bed}
                                className="w-5 h-5 object-contain"
                                alt="bed"
                            />
                            <span className="ml-6 text-gray-600 text-sm">{dictionary.beadroom}</span>
                        </Link>
                        <Link href={`${lang}/shop?category=Kitchen`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                            <Image
                                src={outdoorcafe}
                                className="w-5 h-5 object-contain"
                                alt="outdoor cafe"
                            />
                            <span className="ml-6 text-gray-600 text-sm">{dictionary.kitchen}</span>
                        </Link>
                        <Link href={`${lang}/shop?category=Mattress`} className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                            <Image
                                src={bed2}
                                className="w-5 h-5 object-contain"
                                alt="bed"
                            />
                            <span className="ml-6 text-gray-600 text-sm">{dictionary.mattress}</span>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                    <div className="flex items-center space-x-6 capitalize">
                        <Link href="/" className="text-gray-200 hover:text-white transition">{dictionary.home}</Link>
                        <Link href="/shop" className="text-gray-200 hover:text-white transition">{dictionary.shop}</Link>
                        <a href="#" className="text-gray-200 hover:text-white transition">{dictionary.about}</a>
                        <a href="#" className="text-gray-200 hover:text-white transition">{dictionary.contact}</a>
                    </div>
                    {
                        sidemenu && (
                            <>
                                {
                                    session?.user ? (
                                        <div>
                                            <span className="text-white">{session?.user?.name}</span>
                                            <span className="text-white px-3">|</span>
                                            <Logout />
                                        </div>
                                    ) : (
                                        <Link href="/login" className="text-gray-200 hover:text-white transition">Login</Link>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </nav >
    );
}