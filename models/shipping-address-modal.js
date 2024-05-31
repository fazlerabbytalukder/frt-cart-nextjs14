import mongoose, { Schema } from "mongoose";

const ShippingSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: ObjectId
    },
});


export const shippingModel = mongoose.models.shippingAddress ?? mongoose.model("shippingAddress", ShippingSchema);