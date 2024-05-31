'use client'

import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function SizeFilter() {
    const [selectedSize, setSelectedSize] = useState('');
    const { searchParams, replace } = useRouter();

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);

        // Update URL with selected size
        const newParamString = `size=${newSize}`;
        replace(`?${newParamString}`, { shallow: true });
    };
    return (
        <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Size</h3>
            <div className="flex items-center gap-2">
                <div className="size-selector">
                    <input
                        type="radio"
                        name="size"
                        id={`size-${'XS'}`}
                        value="XS"
                        checked={selectedSize === 'XS'}
                        onChange={handleSizeChange}
                        className="hidden"
                    />
                    <label
                        for={`size-${'XS'}`}
                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                        XS
                    </label>
                </div>
                <div className="size-selector">
                    <input
                        type="radio"
                        name="size"
                        id={`size-${'S'}`}
                        value="S"
                        checked={selectedSize === 'S'}
                        onChange={handleSizeChange}
                        className="hidden"
                    />
                    <label
                        for={`size-${'S'}`}
                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                        S
                    </label>
                </div>
                <div className="size-selector">
                    <input
                        type="radio"
                        name="size"
                        id={`size-${'M'}`}
                        value="M"
                        checked={selectedSize === 'M'}
                        onChange={handleSizeChange}
                        className="hidden"
                    />
                    <label
                        for={`size-${'M'}`}
                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                        M
                    </label>
                </div>
                <div className="size-selector">
                    <input
                        type="radio"
                        name="size"
                        id={`size-${'L'}`}
                        value="L"
                        checked={selectedSize === 'L'}
                        onChange={handleSizeChange}
                        className="hidden"
                    />
                    <label
                        for={`size-${'L'}`}
                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                        L
                    </label>
                </div>
                <div className="size-selector">
                    <input
                        type="radio"
                        name="size"
                        id={`size-${'XL'}`}
                        value="XL"
                        checked={selectedSize === 'XL'}
                        onChange={handleSizeChange}
                        className="hidden"
                    />
                    <label
                        for={`size-${'XL'}`}
                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                    >
                        XL
                    </label>
                </div>
            </div>
        </div>
    );
}