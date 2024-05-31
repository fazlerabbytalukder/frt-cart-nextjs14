import { orderModel } from "@/models/order-modal";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const { userId, purchaseDetails, name, company, region, street, city, number, email } = await request.json();

    await dbConnect();

    const payload = {
        userId: new mongoose.Types.ObjectId(userId),
        purchaseDetails,
        name,
        company,
        company,
        region,
        street,
        city,
        number,
        email
    };

    try {
        await orderModel.create(payload);
        return new NextResponse("A New Order has been made", {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
}