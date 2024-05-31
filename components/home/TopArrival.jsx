import { getAllPorduct } from "@/database/queries";
import ProductCard from "../product/ProductCard";

export default async function TopArrival({ dictionary }) {
    const allProduct = await getAllPorduct();
    const topFourProducts = allProduct.slice(0, 4);
    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {
                    topFourProducts.map((product) => (
                        <ProductCard
                            dictionary={dictionary}
                            key={product.id}
                            productInfo={product}
                        />
                    ))
                }
            </div>
        </div>
    );
}