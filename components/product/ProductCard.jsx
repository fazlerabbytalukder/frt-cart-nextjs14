import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CartButton from '../common/CartButton';
import WishButton from '../common/WishButton';

export default function ProductCard({ productInfo, dictionary }) {
    const rating = Math.floor(productInfo?.rating) || 0;
    const discount = productInfo?.discount || 0;
    const actualPrice = productInfo?.price - (productInfo?.price * discount) / 100;


    return (
        <div className="bg-white shadow rounded overflow-hidden group">
            <div className="relative">
                <Image
                    src={productInfo?.thumbNailUrl}
                    className="w-full"
                    width={1080}
                    height={800}
                    alt="product"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link href={`/product/${productInfo?.id}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product">
                        <FaMagnifyingGlass />
                    </Link>
                    <WishButton productInfo={productInfo} />
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link href={`/product/${productInfo?.id}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{productInfo?.name}</h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">${actualPrice}</p>
                    <p className="text-sm text-gray-400 line-through">${productInfo?.price}.00</p>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        {[...Array(rating)].map((_, index) => (
                            <span key={index}><FaStar /></span>
                        ))}
                        {[...Array(5 - rating)].map((_, index) => (
                            <span key={index}><FaStar style={{ color: 'gray' }} /></span>
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 ml-3">({productInfo?.review})</div>
                </div>
            </div>
            <CartButton className="w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition" productInfo={productInfo}>
                {dictionary?.addcart}
            </CartButton>
        </div >
    );
}