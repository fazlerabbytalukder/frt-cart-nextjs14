'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchTerm(value);
    };

    function doSearch(event) {
        event.preventDefault();

        const params = new URLSearchParams({ search: searchTerm });

        if (pathname.includes("shop")) {
            replace(`${pathname}?${params.toString()}`);
        } else {
            replace(`${pathname}shop?${params.toString()}`);
        }
    }



    return (
        <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400 hidden md:block">
                <FaMagnifyingGlass size={25} />
            </span>
            <input
                type="text"
                name="search"
                id="search"
                onChange={handleInputs}
                value={searchTerm}
                className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                placeholder="search" />
            <button
                onClick={doSearch}
                className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex md:items-center">Search</button>
        </div>
    );
}