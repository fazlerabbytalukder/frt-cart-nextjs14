
import Ads from "@/components/home/Ads";
import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import Features from "@/components/home/Features";
import TopArrival from "@/components/home/TopArrival";
import TrendingProduct from "@/components/home/TrendingProduct";
import { getDictionary } from "../dictionaries";

export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
    <>
      <Banner dictionary={dictionary} />
      <Features />
      <Category dictionary={dictionary} lang={lang} />
      <TopArrival dictionary={dictionary} />
      <Ads />
      <TrendingProduct dictionary={dictionary} />
    </>
  );
}
