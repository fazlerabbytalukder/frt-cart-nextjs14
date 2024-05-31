import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    discount: {
        required: false,
        type: Number
    },
    stock: {
        required: true,
        type: Number
    },
    review: {
        required: true,
        type: Number
    },
    rating: {
        required: true,
        type: Number
    },
    brand: {
        required: true,
        type: String
    },
    tag: {
        required: false,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    thumbNailUrl: {
        required: true,
        type: String
    },
    gallery: {
        required: false,
        type: Array
    }
});

export const productModel = mongoose.models.products ?? mongoose.model("products", productSchema);