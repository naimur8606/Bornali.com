import { useEffect, useState } from "react";
import CommonSliderSection from "../../Shared-Components/Sliders/CommonSliderSection";
import CommonTitle from "../../Shared-Components/CommonTitle";

const PopularItems = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("./Products.json")
            .then((res) => res.json())
            .then((data) => {
                const bestSellersProducts = data?.filter(item => item?.offerType === "Popular Items")
                setProducts(bestSellersProducts)
            });
    }, []);

    const sectionProperties = {
        name: "Popular Items",
        image: "https://i.ibb.co/QXBwqC7/1657088.png",
        link: "/popularItems"
    }

    return (
        <div className="bg-[#f4f6f9] pt-8 pb-12 px-3 lg:px-0">
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

export default PopularItems;