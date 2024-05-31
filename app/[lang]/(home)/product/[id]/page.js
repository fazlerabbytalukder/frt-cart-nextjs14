import { getDictionary } from "@/app/[lang]/dictionaries";
import CartButton from "@/components/common/CartButton";
import WishButton from "@/components/common/WishButton";
import ProductCard from "@/components/product/ProductCard";
import Share from "@/components/product/Share";
import { getAllPorduct, getProductById } from "@/database/queries";
import { dbConnect } from "@/service/mongo";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export async function generateMetadata({ params }) {
    await dbConnect();
    // read route params
    const id = params.id;
    const productInfo = await getProductById(id);

    return {
        title: productInfo?.name.slice(0, 100),
        description: productInfo?.description.slice(0, 100),
    };
}

export default async function ProductDetailsPage({ params: { id, lang } }) {
    const productInfo = await getProductById(id);
    const allProduct = await getAllPorduct();
    const dictionary = await getDictionary(lang);

    const rating = Math.floor(productInfo?.rating) || 0;
    const discount = productInfo?.discount || 0;
    const actualPrice = productInfo?.price - (productInfo?.price * discount) / 100;
    const inStock = productInfo?.stock > 0;

    const filteredRelatedProducts = allProduct.filter(
        (relatedProduct) =>
            relatedProduct?.id !== productInfo?.id &&
            relatedProduct?.category === productInfo?.category
    );

    const slicedRelatedProducts = filteredRelatedProducts.slice(0, 4);

    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <FaHouse />
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">{productInfo?.name} Details</p>
            </div>
            <div className="container grid grid-cols-2 gap-6">
                <div>
                    <Image
                        src={productInfo?.thumbNailUrl}
                        className="w-full"
                        width={1080}
                        height={800}
                        alt="product"
                    />
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        {
                            productInfo?.gallery?.map((image) => (
                                <Image
                                    key={image}
                                    src={image}
                                    width={1080}
                                    height={800}
                                    className="w-full cursor-pointer border border-primary"
                                    alt="product"
                                />
                            ))
                        }
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{productInfo?.name}</h2>
                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            {[...Array(rating)].map((_, index) => (
                                <span key={index}><FaStar /></span>
                            ))}
                            {[...Array(5 - rating)].map((_, index) => (
                                <span key={index}><FaStar style={{ color: 'gray' }} /></span>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 ml-3">({productInfo?.review} Reviews)</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>{dictionary.available}: </span>
                            <span className="text-green-600">
                                {
                                    inStock ? "In Stock" : "Out of Stock"
                                }
                            </span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">{dictionary.brand}: </span>
                            <span className="text-gray-600">{productInfo?.brand}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">{dictionary.category}: </span>
                            <span className="text-gray-600">{productInfo?.category}</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">SKU: </span>
                            <span className="text-gray-600">BE45VGRT</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">${actualPrice}</p>
                        <p className="text-base text-gray-400 line-through">$${productInfo?.price}.00</p>
                    </div>

                    <p className="mt-4 text-gray-600 whitespace-pre-wrap">{productInfo?.description}</p>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <CartButton className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition" productInfo={productInfo}>
                            {dictionary.addcart}
                        </CartButton>
                        <WishButton productInfo={productInfo} />
                    </div>

                    <Share productInfo={productInfo} />
                </div>
            </div>
            <div className="container pt-4 pb-16">
                <h3 className="border-b text-2xl border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Product details</h3>
                <div className="w-3/5 pt-6">
                    <div className="text-gray-600">
                        <p>{productInfo?.description}</p>
                    </div>

                </div>
            </div>
            <div className="container pb-16">
                <h2 className="pb-6">
                    <span className="text-2xl font-medium text-gray-800 uppercase">
                        Related products
                    </span>
                    {filteredRelatedProducts.length === 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                            No related products found.
                        </p>
                    )}
                </h2>
                {filteredRelatedProducts.length > 0 && (
                    <div className="grid grid-cols-4 gap-6">
                        {slicedRelatedProducts.map((relatedProduct) => (
                            <ProductCard dictionary={dictionary} key={relatedProduct.id} productInfo={relatedProduct} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}