import { auth } from "@/auth";
import PaymentForm from "@/components/auth/PaymentForm";
import { getUserByEmail } from "@/database/queries";

const refineCategory = (category) => {
    const decodedCategory = decodeURI(category);
    if (decodedCategory === 'undefined') {
        return "";
    }
    return JSON.parse(decodedCategory) || [];
}

export default async function checkoutPage({ searchParams: { cartItems, totalPrice, deliveryCharge, tax }, params: { lang } }) {
    if (!cartItems) {
        console.error("cartItems is null or undefined");
        return;
    }
    const ActualcartItems = refineCategory(cartItems);
    const ActualtotalPrice = refineCategory(totalPrice);
    const ActualdeliveryCharge = refineCategory(deliveryCharge);
    const Actualtax = refineCategory(tax);

    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);
    const purchaseProductDetails = {
        cartItems: ActualcartItems,
        totalPrice: ActualtotalPrice,
        deliveryCharge: ActualdeliveryCharge,
        tax: Actualtax,
        user: loggedInUser,
    };

    // console.log(purchaseProductDetails);

    return (
        <div>
            <PaymentForm purchaseProductDetails={purchaseProductDetails} loggedInUser={loggedInUser} lang={lang} />

        </div>
    );
}