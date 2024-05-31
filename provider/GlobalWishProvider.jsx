import { WishProvider } from "@/context/wishContext";

export function GlobalWishProvider({ children }) {
    return <WishProvider>{children}</WishProvider>;
}