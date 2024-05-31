import CategoryFilter from "@/components/filter/CategoryFilter";
import PriceFilter from "@/components/filter/PriceFilter";
import SizeFilter from "@/components/filter/SizeFilter";
import NoProduct from "@/components/product/NoProduct";
import ProductCard from "@/components/product/ProductCard";
import { getAllPorduct } from "@/database/queries";
import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import { getDictionary } from "../../dictionaries";

const refineCategory = (category) => {
    const decodedCategory = decodeURI(category);
    if (decodedCategory === 'undefined') {
        return "";
    }
    return decodedCategory;
}

export default async function ShopPage({ searchParams: { search, category, price, size }, params: { lang } }) {
    const dictionary = await getDictionary(lang);
    const Actualcategory = refineCategory(category);
    const ActualPrice = refineCategory(price);
    const ActualSize = refineCategory(size);
    // console.log(size);
    // console.log(price);
    // console.log(ActualPrice);
    const allProduct = await getAllPorduct(search, Actualcategory, ActualPrice, ActualSize);
    // console.log(allProduct);
    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <FaHouse />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Shop</p>
            </div>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">

                <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
                    <div className="divide-y divide-gray-200 space-y-5">
                        <CategoryFilter />
                        <PriceFilter />
                        <SizeFilter />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                        {
                            allProduct.length > 0 ? (
                                allProduct.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        productInfo={product}
                                        dictionary={dictionary}
                                    />
                                ))
                            ) : (
                                <NoProduct />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}