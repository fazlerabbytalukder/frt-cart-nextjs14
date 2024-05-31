import { productModel } from "@/models/product-model";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

export async function getAllPorduct(search, Actualcategory, ActualPrice, ActualSize) {
    const regex = new RegExp(search, "i");
    const products = await productModel
        .find({ name: { $regex: regex } })
        .select(["thumbNailUrl", "name", "price", "discount", "review", "rating", "category", "size", "stock", "brand"])
        .lean();

    let allProduct = products;

    if (Actualcategory) {
        const categoriesToMatch = Actualcategory.split('|');
        allProduct = allProduct.filter(product => {
            return categoriesToMatch.includes(product.
                category.toString())
        })
    }

    // Handle filtering by price range
    if (ActualPrice) {
        const [minPriceString, maxPriceString] = ActualPrice.split('|');
        const minPrice = parseInt(minPriceString, 10);
        const maxPrice = parseInt(maxPriceString, 10);

        allProduct = allProduct.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }



    // Handle filtering by size
    if (ActualSize) {
        const lowerCaseSize = ActualSize.toLowerCase();
        allProduct = allProduct.filter(product => {
            const lowerCaseProductSize = product.size?.toLowerCase();
            if (lowerCaseProductSize) {
                return lowerCaseProductSize === lowerCaseSize;
            } else {
                return false;
            }
        });
    }

    return replaceMongoIdInArray(allProduct);
}

export async function getProductById(productId) {
    const product = await productModel.findById(productId).lean();
    return replaceMongoIdInObject(product);
}

export async function getUserByEmail(email) {
    const users = await userModel.find({ email: email }).lean();
    return replaceMongoIdInObject(users[0]);
}