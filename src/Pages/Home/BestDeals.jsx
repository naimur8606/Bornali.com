import { useEffect, useState } from "react";
import CommonSliderSection from "../../Shared-Components/Sliders/CommonSliderSection";
import CommonTitle from "../../Shared-Components/CommonTitle";

const BestDeals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("./Products.json")
            .then((res) => res.json())
            .then((data) => {
                const bestSellersProducts = data?.filter(item => item?.offerType === "Best Deals")
                setProducts(bestSellersProducts)
            });
    }, []);

    const sectionProperties ={
        name: "Best Deals",
        image: "https://i.ibb.co/1z4zX06/best-Deals-icon.png",
        link: "/bestDeals"
    }
    
    return (
        <div className="bg-[#f4f6f9] pt-8 px-3 lg:px-0">
            <div className="bg-[#f4f6f9] md:pt-8 lg:pt-10 px-3 lg:px-0">
                <CommonTitle sectionProperties={sectionProperties}></CommonTitle>
                <div className="hidden lg:block">
                    <CommonSliderSection products={products} slideNumber={2}></CommonSliderSection>
                </div>
                <div className="lg:hidden">
                    <CommonSliderSection products={products} slideNumber={1}></CommonSliderSection>
                </div>
            </div>
        </div>
    );
};

export default BestDeals;