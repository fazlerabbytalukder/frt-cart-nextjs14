'use client'
import CartContext from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaHouse, FaTrash } from "react-icons/fa6";

export default function Cart({ lang }) {
    const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

    const increaseQty = (cartItem) => {
        const newQty = cartItem?.quantity + 1;
        const item = { ...cartItem, quantity: newQty };

        if (newQty > Number(cartItem.stock)) return;

        addItemToCart(item);
    };

    const decreaseQty = (cartItem) => {
        const newQty = cartItem?.quantity - 1;
        const item = { ...cartItem, quantity: newQty };

        if (newQty <= 0) return;

        addItemToCart(item);
    };

    const calculateTotalPrice = () => {
        return cart?.cartItems?.reduce((total, item) => {
            const discount = item?.discount || 0;
            const actualPrice = item?.price - (item?.price * discount / 100);
            return total + (actualPrice * item.quantity);
        }, 0) || 0;
    };

    const totalPrice = calculateTotalPrice();
    const deliveryCharge = 10;
    const tax = totalPrice / 100;
    const finalTotalPrice = totalPrice + deliveryCharge + tax;


    const allCheckoutData = {
        cartItems: cart?.cartItems?.map((item) => {
            const discount = item?.discount || 0;
            const actualPrice = item?.price - (item?.price * discount / 100);
            return {
                id: item.id, // Ensure each item has a unique identifier
                name: item.name,
                price: actualPrice.toFixed(2), // Format the price to two decimal places
                quantity: item.quantity,
                discount: discount,
            };
        }),
        totalPrice: finalTotalPrice.toFixed(2), // Include tax and delivery
        deliveryCharge: 10, // Consider storing this in a variable if needed
        tax: tax.toFixed(2),
    };

    const queryString = `?cartItems=${JSON.stringify(allCheckoutData.cartItems)}&totalPrice=${allCheckoutData.totalPrice}&deliveryCharge=${allCheckoutData.deliveryCharge}&tax=${allCheckoutData.tax}`;

    return (
        <div className="container">
            <div className="py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <FaHouse />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">You have {cart?.cartItems?.length || 0} Product In Your cart</p>
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3">
                    {cart?.cartItems?.length > 0 && (
                        <div className="gap-6 pt-4 pb-16">
                            <div className="mx-auto space-y-4 max-w-6xl">
                                {
                                    cart?.cartItems?.map((cartItem) => {
                                        const discount = cartItem?.discount || 0;
                                        const actualPrice = cartItem?.price - (cartItem?.price * discount / 100);
                                        return (
                                            <div key={cartItem.id} className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                                                <div className="w-28">
                                                    <Image
                                                        src={cartItem?.image}
                                                        className="w-full"
                                                        alt="product"
                                                        width={1200}
                                                        height={800}
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <h2 className="text-gray-800 text-xl font-medium uppercase">{cartItem?.name}</h2>
                                                    <p className="text-gray-500 text-sm">
                                                        Availability: {cartItem?.stock > 0 ? (
                                                            <span className="text-green-600">{cartItem.stock} in Stock</span>
                                                        ) : (
                                                            <span className="text-red-600">Out of Stock</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="text-primary text-lg font-semibold">${actualPrice * cartItem.quantity.toFixed(2)}</div>
                                                <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-1 w-28">
                                                    <button
                                                        data-action="decrement"
                                                        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                                        onClick={() => decreaseQty(cartItem)}
                                                    >
                                                        <span className="m-auto text-2xl font-thin">
                                                            −
                                                        </span>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                                                        name="custom-input-number"
                                                        value={cartItem.quantity}
                                                        readOnly
                                                    ></input>
                                                    <button
                                                        data-action="increment"
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                                        onClick={() => increaseQty(cartItem)}
                                                    >
                                                        <span className="m-auto text-2xl font-thin">
                                                            +
                                                        </span>
                                                    </button>
                                                </div>

                                                <div className="text-gray-600 cursor-pointer hover:text-primary" onClick={() =>
                                                    deleteItemFromCart(cartItem?.product)
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
                <div className="mt-4">
                    <div className="border border-gray-500 p-4 rounded-md">
                        <div className="border-b border-gray-500">
                            <div className="flex justify-between mb-2">
                                <p>Price:</p>
                                <p>${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Delivary Charge:</p>
                                <p>$10.00</p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p>Tax:</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between mb-2 mt-3">
                            <p>Total Price:</p>
                            <p>${finalTotalPrice.toFixed(2)}</p>
                        </div>
                        <Link href={lang ? `/${lang}/checkout${queryString}` : `/checkout${queryString}`} className="bg-green-600 px-3 py-2 text-center text-white font-semibold w-full rounded-md">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}