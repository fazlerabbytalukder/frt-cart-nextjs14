import category1 from '@/public/images/category/category-1.jpg';
import category2 from '@/public/images/category/category-2.jpg';
import category3 from '@/public/images/category/category-3.jpg';
import category4 from '@/public/images/category/category-4.jpg';
import category5 from '@/public/images/category/category-5.jpg';
import category6 from '@/public/images/category/category-6.jpg';
import Image from 'next/image';
import Link from 'next/link';

export default function Category({ dictionary, lang }) {
    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
            <div className="grid grid-cols-3 gap-3">
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category1}
                        className="w-full"
                        alt="logo"
                    />
                    <Link href={`${lang}/shop?category=Bedroom`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.beadroom}</Link>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category2}
                        className="w-full"
                        alt="logo"
                    />
                    <Link href={`${lang}/shop?category=Mattress`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.mattress}</Link>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category3}
                        className="w-full"
                        alt="logo"
                    />
                    <Link href={`${lang}/shop?category=Outdoor`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.outdoor}
                    </Link>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category4}
                        className="w-full"
                        alt="logo"
                    />
                    <Link href={`${lang}/shop?category=Sofa`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.sofa}</Link>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category5}
                        className="w-full"
                        alt="logo"
                    />
                    <a href={`${lang}/shop?category=Living`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.living}</a>
                </div>
                <div className="relative rounded-sm overflow-hidden group">
                    <Image
                        src={category6}
                        className="w-full"
                        alt="logo"
                    />
                    <a href={`${lang}/shop?category=Kitchen`}
                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{dictionary.kitchen}</a>
                </div>
            </div>
        </div>
    );
}