import WishContext from "@/context/wishContext";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa6";

export default function WishBtn({ productInfo }) {
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
        <button onClick={addToWishHandler}
            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
            <FaHeart /> Wishlist
        </button>
    );
}