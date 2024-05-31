import Link from "next/link";
import { FaHouse } from "react-icons/fa6";

export default function BreadCrumb() {
    return (
        <div className="container py-4 flex items-center gap-3">
            <Link href="/" className="text-primary text-base">
                <FaHouse />
            </Link>
            <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
            </span>
            <p className="text-gray-600 font-medium">Account</p>
        </div>
    );
}