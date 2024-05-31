'use client'

import WishContext from "@/context/wishContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaHouse, FaTrash } from "react-icons/fa6";
import CartButton from "./CartButton";

export default function Fav() {
    const { addItemTowish, deleteItemFromwish, wish } = useContext(WishContext);

    return (
        <div className="container">
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <FaHouse />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">You have {wish?.wishItems?.length || 0} Product In Your Wish List</p>
            </div>
            {wish?.wishItems?.length > 0 && (
                <div className="gap-6 pt-4 pb-16">
                    <div className="mx-auto space-y-4 max-w-6xl">
                        {
                            wish?.wishItems?.map((wishItem) => {
                                const discount = wishItem?.discount || 0;
                                const actualPrice = wishItem?.price - (wishItem?.price * discount / 100);

                                const productInfo = {
                                    id: wishItem?.product,
                                    name: wishItem?.name,
                                    price: wishItem?.price,
                                    discount: wishItem?.discount,
                                    thumbNailUrl: wishItem?.image,
                                    stock: wishItem?.stock,
                                    brand: wishItem?.brand
                                };
                                return (
                                    <div key={wishItem.id} className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                                        <div className="w-28">
                                            <Image
                                                src={wishItem?.image}
                                                className="w-full"
                                                alt="product"
                                                width={1200}
                                                height={800}
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <h2 className="text-gray-800 text-xl font-medium uppercase">{wishItem?.name}</h2>
                                            <p className="text-gray-500 text-sm">
                                                Availability: {wishItem?.stock > 0 ? (
                                                    <span className="text-green-600">{wishItem.stock} in Stock</span>
                                                ) : (
                                                    <span className="text-red-600">Out of Stock</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="text-primary text-lg font-semibold">${actualPrice}</div>
                                        <CartButton className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium" productInfo={productInfo}>
                                            Add To Cart
                                        </CartButton>

                                        <div className="text-gray-600 cursor-pointer hover:text-primary" onClick={() =>
                                            deleteItemFromwish(wishItem?.product)
                                        }>
                                            <FaTrash />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}

        </div>
    );
}