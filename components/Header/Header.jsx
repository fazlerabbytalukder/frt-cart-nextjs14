'use client'

import CartContext from '@/context/cartContext';
import WishContext from '@/context/wishContext';
import logo from '@/public/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import Search from '../filter/Search';

export default function Header({ sidemenu }) {
    const { addItemToCart, cart } = useContext(CartContext);
    const { addItemTowish, wish } = useContext(WishContext);
    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={logo}
                        className="w-32"
                        alt="logo"
                    />
                </Link>
                <Search />

                {
                    sidemenu && (
                        <div className="flex items-center space-x-4">
                            <Link href="/wishlist" className="text-center text-gray-700 hover:text-primary transition relative">
                                <div className="text-2xl">
                                    <FaHeart />
                                </div>
                                <div className="text-xs leading-3">Wishlist</div>
                                <div
                                    className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                    {wish?.wishItems?.length || 0}</div>
                            </Link>
                            <Link href="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
                                <div className="text-2xl">
                                    <FaShoppingBag />
                                </div>
                                <div className="text-xs leading-3">Cart</div>
                                <div
                                    className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                    {cart?.cartItems?.length || 0}</div>
                            </Link>
                            <Link href="/account" className="text-center text-gray-700 hover:text-primary transition relative">
                                <div className="text-2xl">
                                    <i className="fa-regular fa-user"></i>
                                </div>
                                <div className="text-xs leading-3">Account</div>
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}