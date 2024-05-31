import mongoose, { Schema } from "mongoose";

const billingSchema = new Schema({
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


export const bilingModel = mongoose.models.bilingAddress ?? mongoose.model("bilingAddress", billingSchema);