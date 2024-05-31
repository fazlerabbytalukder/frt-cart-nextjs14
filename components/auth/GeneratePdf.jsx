'use client'

import html2pdf from "html2pdf.js";
import { useRef } from "react";


export default function GeneratePdf({ ActualPaymentDetails }) {
    const slidesRef = useRef(null);
    // console.log(ActualPaymentDetails);

    const handleGeneratePdf = () => {
        const opt = {
            margin: 1,
            filename: "invoice.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orienattion: "portrait" }
        }
        html2pdf().from(slidesRef.current).set(opt).save();
    }
    return (
        <>
            <div className="container mx-auto">
                <div className="lg:w-4/5 w-full mx-auto border border-gray-500 m-8 p-8" ref={slidesRef}>
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">INVOICE</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">This is your Product Information. Now you can download the pdf.</p>
                    </div>
                    <div className="overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ActualPaymentDetails?.cartItems?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">{item?.name}</td>
                                            <td className="px-4 py-3">{item?.quantity}</td>
                                            <td className="px-4 py-3">${(item?.price * item?.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div>
                            <p className="text-lg font-semibold text-gray-900">Delivary: <span className="font-normal">${ActualPaymentDetails?.deliveryCharge}</span></p>
                            <p className="text-lg font-semibold text-gray-900">Tax:<span className="font-normal">${ActualPaymentDetails?.tax}</span></p>
                            <p className="text-lg font-semibold text-gray-900">Total Price:<span className="font-normal">${ActualPaymentDetails?.totalPrice}</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center" onClick={handleGeneratePdf}>
                    <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Download Invoice</button>
                </div>
            </div>
        </>
    );
}