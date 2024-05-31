import Link from "next/link";

export default function Banner({ dictionary }) {
    return (
        <div className="bg-cover bg-no-repeat bg-center py-36 bg-[url('/banner-bg.jpg')]">
            <div className="container">
                <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                    {dictionary.title1} <br /> {dictionary.title2}
                </h1>
                <p className="w-1/3">{dictionary.des}</p>
                <div className="mt-12">
                    <Link href="/shop" className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary">Shop Now</Link>
                </div>
            </div>
        </div>
    );
}