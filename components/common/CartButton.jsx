'use client'

import CartContext from "@/context/cartContext";
import Link from "next/link";
import { useContext } from "react";

export default function CartButton({ children, className, productInfo }) {
    const { addItemToCart, cart } = useContext(CartContext);

    const isProductInCart = cart?.cartItems?.some(
        (item) => item?.product === productInfo?.id
    );


    const addToCartHandler = () => {
        addItemToCart({
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
        <Link
            href="/cart"
            className={`block ${className} ${isProductInCart ? 'bg-gray-400' : ''}`}
            onClick={addToCartHandler}
        >
            {children}
        </Link>
    );
}