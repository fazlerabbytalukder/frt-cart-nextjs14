

import poppins from "@/app/fonts";
import CopyRight from "@/components/CopyRight";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Header/Navbar";
import { GlobalProvider } from "@/provider/GlobalProvider";
import { GlobalWishProvider } from "@/provider/GlobalWishProvider";
import { dbConnect } from "@/service/mongo";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../../globals.css";
import { getDictionary } from "../dictionaries";

config.autoAddCss = false;

export const metadata = {
    title: "lws cart",
    description: "Ecommerce website for furniture selling",
};

export default async function Layout({ children, params: { lang } }) {
    await dbConnect();
    const dictionary = await getDictionary(lang);
    // console.log(lang);
    return (
        <html lang="en">
            <body className={poppins?.className}>
                <GlobalProvider>
                    <GlobalWishProvider>
                        <Header sidemenu={false} />
                        <Navbar sidemenu={false} dictionary={dictionary} lang={lang} />
                        {children}
                        <Footer />
                        <CopyRight />
                    </GlobalWishProvider>
                </GlobalProvider>
            </body>
        </html>
    );
}
