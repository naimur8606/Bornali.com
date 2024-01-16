import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import { IoMdArrowRoundUp } from "react-icons/io";
import OfferBoard from "./OfferBoard";
import BestSellers from "./BestSellers";
import BestDeals from "./BestDeals";
import PopularOffer from "./PopularItems";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const isPastThreshold = window.scrollY > scrollThreshold;
      setIsButtonVisible(isPastThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto">
      <Helmet>
        <title>EstateEcho | Home</title>
      </Helmet>
      <Banner />
      <OfferBoard></OfferBoard>
      <BestSellers></BestSellers>
      <BestDeals></BestDeals>
      <PopularOffer></PopularOffer>
      <ShopByCategory></ShopByCategory>

      <div className="relative">
        {isButtonVisible && (
          <button
            onClick={handleButtonClick}
            className="fixed bottom-8 ml-5  bg-[#FECD28] text-white text-xl p-2 rounded-full shadow-md cursor-pointer"
          >
            <IoMdArrowRoundUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
