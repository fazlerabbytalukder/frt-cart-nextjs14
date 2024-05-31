import GeneratePdf from "@/components/auth/GeneratePdf";

const refineCategory = (category) => {
    const decodedCategory = decodeURI(category);
    if (decodedCategory === 'undefined') {
        return "";
    }
    return JSON.parse(decodedCategory) || [];
}

export default function pdfPage({ searchParams: { details } }) {
    const ActualPaymentDetails = refineCategory(details);
    // console.log(ActualPaymentDetails);
    return (
        <>
            <GeneratePdf ActualPaymentDetails={ActualPaymentDetails} />
        </>
    );
}