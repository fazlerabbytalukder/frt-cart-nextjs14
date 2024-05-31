'use client'
import WishContext from "@/context/wishContext";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa6";

export default function WishButton({ productInfo }) {
    const { addItemTowish } = useContext(WishContext);

    const addToWishHandler = () => {
        addItemTowish({
            product: productInfo?.id,
            name: productInfo?.name,
            price: productInfo?.price,
            discount: productInfo?.discount,
            image: productInfo?.thumbNailUrl,
            stock: productInfo?.stock,
            brand: productInfo?.brand,
        });
    };
    return (
        <button
            onClick={addToWishHandler}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist">
            <FaHeart />
        </button>
    );
}