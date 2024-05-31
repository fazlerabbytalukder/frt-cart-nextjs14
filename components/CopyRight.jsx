import methods from '@/public/images/methods.png';
import Image from 'next/image';

export default function CopyRight() {
    return (
        <div className="bg-gray-800 py-4">
            <div className="container flex items-center justify-between">
                <p className="text-white">@ TailCommerce - All Right Reserved</p>
                <div>
                    <Image
                        src={methods}
                        className="h-5 w-[260px]"
                        alt="method"
                    />
                </div>
            </div>
        </div>
    );
}