'use client';

import { FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { usePathname } from 'next/navigation';

export default function Share({ productInfo }) {
    const pathName = usePathname();
    console.log("page url", pathName);
    const pageFullUrl = process.env.NEXT_PUBLIC_SITE_URI + usePathname();
    console.log(pageFullUrl);


    return (
        <div className="flex gap-3 mt-4">
            <FacebookShareButton
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                url={pageFullUrl} >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton
                url={pageFullUrl} >
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <TwitterShareButton
                url={pageFullUrl} >
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            {/* <a href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                <FaFacebookSquare />
            </a>
            <a href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                <FaTwitter />
            </a>
            <a href="#"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                <FaInstagram />
            </a> */}
        </div>
    );
}