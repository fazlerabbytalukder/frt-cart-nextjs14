"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentForm({ purchaseProductDetails, loggedInUser, lang }) {
    const { user, cartItems, tax, deliveryCharge, totalPrice } = purchaseProductDetails;
    console.log(purchaseProductDetails);

    const [error, setError] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        company: "",
        region: "",
        street: "",
        city: "",
        number: "",
        email: user?.email || ""
    });

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (name === "number") {
            setPhoneNumberError("");
        }
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.name) errors.push("First Name");
        if (!formData.region) errors.push("Country/Region");
        if (!formData.street) errors.push("Street address");
        if (!formData.city) errors.push("City");
        if (!formData.number) {
            errors.push("Phone number");
            setPhoneNumberError("Please write a number in Phone number");
        } else if (!/^\d+$/.test(formData.number)) {
            errors.push("Phone number");
            setPhoneNumberError("Please enter a valid phone number");
        }
        if (!formData.email) errors.push("Email address");
        if (!isCheckboxChecked) errors.push("Agreement to terms & conditions");

        return errors;
    };

    async function onSubmit(event) {
        event.preventDefault();
        const errors = validateForm();

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const userId = loggedInUser?.id;
            const purchaseDetails = purchaseProductDetails;

            const res = await fetch("/api/auth/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    purchaseDetails,
                    ...formData
                }),
            });
            if (res.status === 201) {
                setIsModalVisible(true);
            } else {
                const errorData = await res.json();
                setError(errorData.message || "Failed to place the order");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
        const queryString = `?details=${JSON.stringify(purchaseProductDetails)}`;
        router.push(`${lang ? `/${lang}/pdf` : `/pdf`}${queryString}`);
    };


    return (
        <>
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Success</h2>
                        <p>Your order has been placed successfully!</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={onSubmit} className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <div className="col-span-8 border border-gray-200 p-4 rounded">
                    <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="text-gray-600">First Name <span className="text-primary">*</span></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="text-gray-600">Company</label>
                            <input
                                type="text"
                                name="company"
                                id="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                        <div>
                            <label htmlFor="region" className="text-gray-600">Country/Region</label>
                            <input
                                type="text"
                                name="region"
                                id="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                        <div>
                            <label htmlFor="street" className="text-gray-600">Street address</label>
                            <input
                                type="text"
                                name="street"
                                id="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="text-gray-600">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                        <div>
                            <label htmlFor="number" className="text-gray-600">Phone number</label>
                            <input
                                type="text"
                                name="number"
                                id="number"
                                value={formData.number}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                            {phoneNumberError && <span className="text-red-500">{phoneNumberError}</span>}
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input-box"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">Order Summary</h4>
                    <div className="space-y-2">
                        {
                            cartItems?.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <h5 className="text-gray-800 font-medium">{item?.name}</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x{item?.quantity}
                                    </p>
                                    <p className="text-gray-800 font-medium">${(item?.price * item?.quantity).toFixed(2)}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                        <p>Tax</p>
                        <p>{tax}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase">
                        <p>Shipping</p>
                        <p>{deliveryCharge}</p>
                    </div>

                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercase">
                        <p className="font-semibold">Total</p>
                        <p>${totalPrice}</p>
                    </div>

                    <div className="flex items-center mb-4 mt-2">
                        <input
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                            checked={isCheckboxChecked}
                            onChange={handleCheckboxChange}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                        />
                        <label htmlFor="agreement" className="text-gray-600 ml-3 cursor-pointer text-sm">
                            I agree to the <a href="#" className="text-primary">terms & conditions</a>
                        </label>
                    </div>

                    {validationErrors.length > 0 && (
                        <div className="mb-4 text-red-500">
                            <span>Please complete the following fields: {validationErrors.join(", ")}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                    >
                        Place order
                    </button>
                </div>
            </form>
        </>
    );
}