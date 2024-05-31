'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";


export default function CategoryFilter() {
    const [query, setQuery] = useState([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleChange = (event) => {
        event.preventDefault();

        const name = event.target.name;
        const checked = event.target.checked;

        if (checked) {
            setQuery(prev => [...prev, name]);
        } else {
            const filtered = query.filter(item => item !== name);
            setQuery(filtered);
        }

        // console.log(query);
    }

    useEffect(() => {
        const category = params.get('category');

        if (category) {
            const decodedCategory = decodeURI(category);
            const queryInCategory = decodedCategory.split('|');
            setQuery(queryInCategory);
        }

    }, []);

    useEffect(() => {
        if (query.length > 0) {
            params.set('category', encodeURI(query.join('|')))
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`)
    }, [query])


    return (
        <div>
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
            <div className="space-y-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Bedroom"
                        id="cat-1"
                        checked={query.includes('Bedroom')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer">Bedroom</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Mattrass"
                        id="cat-2"
                        checked={query.includes('Mattrass')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-2" className="text-gray-600 ml-3 cusror-pointer">Mattrass</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Outdoor"
                        id="cat-3"
                        checked={query.includes('Outdoor')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-3" className="text-gray-600 ml-3 cusror-pointer">Outdoor</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Sofa"
                        id="cat-4"
                        checked={query.includes('Sofa')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-4" className="text-gray-600 ml-3 cusror-pointer">Sofa</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Living"
                        id="cat-5"
                        checked={query.includes('Living')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-5" className="text-gray-600 ml-3 cusror-pointer">Living Room</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="Kitchen"
                        id="cat-6"
                        checked={query.includes('Kitchen')}
                        onChange={handleChange}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                    <label htmlFor="cat-6" className="text-gray-600 ml-3 cusror-pointer">Kitchen</label>
                    <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
            </div>
        </div>
    );
}