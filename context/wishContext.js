"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
    const [wish, setWish] = useState([]);

    const router = useRouter;

    useEffect(() => {
        setWishToState();
    }, []);

    const setWishToState = () => {
        setWish(
            localStorage.getItem("wish")
                ? JSON.parse(localStorage.getItem("wish"))
                : []
        );
    };

    const addItemTowish = async ({
        product,
        name,
        price,
        discount,
        image,
        stock,
        brand,
        quantity = 1,
    }) => {
        const item = {
            product,
            name,
            price,
            discount,
            image,
            stock,
            brand,
            quantity,
        };

        const isItemExist = wish?.wishItems?.find(
            (i) => i.product === item.product
        );

        let newwishItems;

        if (isItemExist) {
            newwishItems = wish?.wishItems?.map((i) =>
                i.product === isItemExist.product ? item : i
            );
        } else {
            newwishItems = [...(wish?.wishItems || []), item];
        }

        localStorage.setItem("wish", JSON.stringify({ wishItems: newwishItems }));
        setWishToState();
    };

    const deleteItemFromwish = (id) => {
        const newwishItems = wish?.wishItems?.filter((i) => i.product !== id);

        localStorage.setItem("wish", JSON.stringify({ wishItems: newwishItems }));
        setWishToState();
    };

    return (
        <WishContext.Provider
            value={{
                wish,
                addItemTowish,
                deleteItemFromwish,
            }}
        >
            {children}
        </WishContext.Provider>
    );
};

export default WishContext;