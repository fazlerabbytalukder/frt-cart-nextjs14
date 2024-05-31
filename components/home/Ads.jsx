import offer from '@/public/images/offer.jpg';
import Image from 'next/image';

export default function Ads() {
    return (
        <div className="container pb-16">
            <a href="#">
                <Image
                    src={offer}
                    className="w-full"
                    alt="logo"
                />
            </a>
        </div>
    );
}