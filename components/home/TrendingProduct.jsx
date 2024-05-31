import { getAllPorduct } from "@/database/queries";
import ProductCard from "../product/ProductCard";

export default async function TrendingProduct({ dictionary }) {
    const allProduct = await getAllPorduct();

    // Filter and sort products by rating in descending order and take the top 4
    const topRatedProducts = allProduct
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">TRENDING PRODUCTS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {topRatedProducts.map((product) => (
                    <ProductCard dictionary={dictionary} key={product.id} productInfo={product} />
                ))}
            </div>
        </div>
    );
}