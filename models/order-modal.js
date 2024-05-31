import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        required: true,
        type: ObjectId
    },
    purchaseDetails: {
        required: true,
        type: Object
    },
    name: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: String
    },
    region: {
        required: false,
        type: String
    },
    street: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    }
});

export const orderModel = mongoose.models.orders ?? mongoose.model("orders", orderSchema);