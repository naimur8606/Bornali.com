import CommonTitle from "../../Shared-Components/CommonTitle";
import ShopByCategorySlider from "../../Shared-Components/Sliders/ShopByCategorySlider";

const ShopByCategory = () => {
    

    const sectionProperties = {
        name: "Shop By Category",
        image: "https://i.ibb.co/DgfPmg5/best-token.png",
        link: "/categories"
    }
    return (
        <div className="my-10 px-5">
            <CommonTitle sectionProperties={sectionProperties}></CommonTitle>
            <div className="hidden md:block">
            <ShopByCategorySlider slideNumber={4}></ShopByCategorySlider>
            </div>
            <div className="md:hidden">
            <ShopByCategorySlider slideNumber={2}></ShopByCategorySlider>
            </div>
        </div>
    );
};

export default ShopByCategory;