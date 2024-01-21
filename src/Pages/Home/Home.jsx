import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OfferBoard from "./OfferBoard";
import ShopByCategory from "./ShopByCategory";
import AppSection from "./AppSection";
import Testimonials from "./Testimonials";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import HomeCommonSection from "./HomeCommonSection";
import UpperArrow from "../../Shared-Components/Sliders/UpperArrow";

const Home = () => {
  const axiosPublic = useAxiosPublic()
  const [products, setProducts] = useState([])

  useEffect(() => {
    axiosPublic.get('/products').then(data => setProducts(data?.data))
  }, [axiosPublic])
  const bestSellers = products?.filter(item => item?.offerType === "best-sellers")
  const bestDeals = products?.filter(item => item?.offerType === "best-deals")
  const popularItems = products?.filter(item => item?.offerType === "popular-items")
  const sectionTitle = [
    {
      name: "Best Sellers",
      logo: "https://i.ibb.co/DgfPmg5/best-token.png",
      link: "best-sellers"
    }, {
      name: "Best Deals",
      logo: "https://i.ibb.co/1z4zX06/best-Deals-icon.png",
      link: "best-deals"
    },
    {
      name: "Popular Items",
      logo: "https://i.ibb.co/QXBwqC7/1657088.png",
      link: "popular-items"
    }
  ]

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto">
      <Helmet>
        <title>Bornali | Home</title>
      </Helmet>
      <Banner />
      <OfferBoard></OfferBoard>
      <HomeCommonSection products={bestSellers} title={sectionTitle[0]}></HomeCommonSection>
      <HomeCommonSection products={bestDeals} title={sectionTitle[1]}></HomeCommonSection>
      <HomeCommonSection products={popularItems} title={sectionTitle[2]}></HomeCommonSection>
      <ShopByCategory></ShopByCategory>
      <AppSection></AppSection>
      <Testimonials></Testimonials>
      <UpperArrow></UpperArrow>
    </div>
  );
};

export default Home;
