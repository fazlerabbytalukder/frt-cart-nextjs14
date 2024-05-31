'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function PriceFilter() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { searchParams, replace } = useRouter();

    const handlePriceChange = (event) => {
        const { name, value } = event.target;

        // Parse the entered value to a number (considering leading zeros)
        const parsedValue = parseInt(value.replace(/^0+/, ''), 10); // Remove leading zeros

        if (name === 'min') {
            setMinPrice(parsedValue);
        } else if (name === 'max') {
            setMaxPrice(parsedValue);
        }
    };

    useEffect(() => {
        if (typeof minPrice === 'number' && !isNaN(minPrice) &&
            typeof maxPrice === 'number' && !isNaN(maxPrice)) {
            const newParamString = `price=${minPrice}|${maxPrice}`;
            replace(`?${newParamString}`, { shallow: true });
        }
    }, [minPrice, maxPrice, replace]);

    return (
        <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    name="min"
                    id="min"
                    value={minPrice}
                    onChange={handlePriceChange}
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                    type="text"
                    name="max"
                    id="max"
                    value={maxPrice}
                    onChange={handlePriceChange}
                    className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                    placeholder="max"
                />
            </div>
        </div>
    );
}